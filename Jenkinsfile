
 import groovy.json.JsonSlurper
import hudson.FilePath
import java.text.SimpleDateFormat

print JOB_NAME
print JENKINS_HOME

env.GIT_CHANGE_FILE_LIST = ""

pipeline {
    agent {
        node {
            label "${WORK_NODE}"
        }
    }
    options {
        timeout(time: 30, unit: "MINUTES")
    }
    stages {
        stage("Initial") {
            steps {
                buildName "AigcPortal ${NODE_ENV.capitalize()} Manual Deploy NO.${BUILD_NUMBER}"
                buildDescription "Build On Node: ${NODE_NAME} By ${BUILD_USER}"
            }
        }
        stage("Check Runtime Image") {
            steps {
                script {
                    def projectRuntimeDockerImageExists = !sh(returnStatus: true, script: "sudo docker inspect ${PROJECT_NAME}-runtime:latest")
                    println "Project Runtime Docker Image Exists: ${projectRuntimeDockerImageExists}"

                    env.GIT_CHANGE_FILE_LIST = sh(returnStdout: true, script: 'sudo git diff --name-only HEAD~1').trim().replaceAll("\\n", " ")
                    println "Change File List Of Nearest Commit: ${GIT_CHANGE_FILE_LIST}"

                    def runtimeDockerfileChanged = env.GIT_CHANGE_FILE_LIST.matches(/.*RuntimeDockerfile.*/)
                    println "Need rebuild Runtime Docker Image: ${runtimeDockerfileChanged}"

                    def nodeRequireModulesChanged = env.GIT_CHANGE_FILE_LIST.matches(/.*package.*?.json.*/)
                    println "has Node Require Modules been changed: ${nodeRequireModulesChanged}"

                    if (projectRuntimeDockerImageExists) {
                        if (runtimeDockerfileChanged || nodeRequireModulesChanged) {
                            sh "sudo docker rmi -f ${PROJECT_NAME}-runtime:latest"
                            sh "sudo docker build -f ./RuntimeDockerfile -t ${PROJECT_NAME}-runtime:latest ."
                        }
                    } else {
                        sh "sudo docker build -f ./RuntimeDockerfile -t ${PROJECT_NAME}-runtime:latest ."
                    }
                }
            }
        }
        stage("Build Image") {
            steps {
                script {
                    def projectDockerImageExists = !sh(returnStatus: true, script: "sudo docker inspect ${PROJECT_NAME}:latest")
                    println "Project Docker Image Exists: ${projectDockerImageExists}"

                    def projectDockerContainerExists = !sh(returnStatus: true, script: "sudo docker inspect ${PROJECT_NAME}")
                    println "Project Docker Container Exists: ${projectDockerContainerExists}"

                    if (projectDockerImageExists) {
                        if (projectDockerContainerExists) {
                            sh "sudo docker-compose down"
                        }
                        sh "sudo docker rmi -f ${PROJECT_NAME}:latest"
                    }
                    sh "sudo docker build -t ${PROJECT_NAME}:latest ."
                }
            }
        }
        stage("Deploy") {
            steps {
                script {
                    sh "sudo docker-compose up -d"
                }
            }
        }
    }
    post {
        always {
            slackSend channel: "#deploy", blocks: genSlackNotificationBlocks(currentBuild)
            emailext subject: "[Manual Deploy] - AigcPortal ${NODE_ENV.capitalize()} Build Result",
                body: '''${SCRIPT, template="managed:Groovy Email Build Result Template"}''',
                to: 'tuobao95@gmail.com;jacky@materia-logic.com; ${DEFAULT_RECIPIENTS}',
                mimeType: "text/html"
        }
    }
}

def genSlackNotificationBlocks(build) {
    def resultIconMap = [
        'SUCCESS': ':large_green_circle:',
        'FAILURE': ':red_circle:',
        'UNSTABLE': ':large_orange_circle:',
    ]
    def changeSets = build.changeSets
    def changeDetail = new StringBuilder()
    if (changeSets != null) {
        def hadChanges = false
        changeSets.each { cs_list ->
            cs_list.each { cs ->
                hadChanges = true
                changeDetail.append("*Changes:*\n")
                def match = cs.msgAnnotated =~ /<a href='(.*?)'/
                def commitDetail = new StringBuilder()
                if (match) {
                    def commitIDMatch = cs.msgAnnotated =~ />(commit.*)</
                    def result = "<${match[0][1]}|${commitIDMatch[0][1]}>"
                    commitDetail.append(cs.msgAnnotated.replaceAll(/<a.*<\/a>/, result))
                }
                changeDetail.append("\tRevision by ${cs.author}${commitDetail ? ':' : ''}\t${commitDetail}\n")
                cs.affectedFiles.each { p ->
                    changeDetail.append("\t${p.editType.name}:\t\t${p.path}\n")
                }
            }
        }
        if (!hadChanges) {
            changeDetail.append("\tNo Changes")
        }
    }

    return [[
        "type": "header",
        "text": [
            "type": "plain_text",
            "text": "Jenkins Manual Deploy Job Build Result",
            "emoji": true
        ]
    ], [
        "type": "section",
        "text": [
            "type": "mrkdwn",
            "text": "${resultIconMap[build.result]} *<${BUILD_URL}|AigcPortal ${NODE_ENV.capitalize()}>*\t<@U05H9MAFMBM> <@U01G2KHDKKK>"
        ]
    ], [
        "type": "section",
        "text": [
            "type": "mrkdwn",
            "text": "*Cause:*\n\t${build.getBuildCauses().collect { it.shortDescription }.join(" ")}\n*Date:*\n\t${new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(build.getTimeInMillis())}\n*Duration:*\n\t${build.durationString}"
        ],
        "accessory": [
            "type": "image",
            "image_url": "https://taotaro-test.oss-cn-hongkong.aliyuncs.com/Y_Brand_D_YWCA_8163809fc2.png",
            "alt_text": "project link"
        ]
    ], [
        "type": "section",
        "text": [
            "type": "mrkdwn",
            "text": changeDetail
        ]
    ], [
        "type": "actions",
        "elements": [[
            "type": "button",
            "text": [
                "type": "plain_text",
                "emoji": true,
                "text": "Click To View Build Logs"
            ],
            "style": "primary",
            "url": "${BUILD_URL}/console"
        ]]
    ], [
        "type": "divider"
    ]]
}
