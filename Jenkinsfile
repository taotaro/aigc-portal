pipeline {
    agent any
    options {
        timeout(time: 30, unit: "MINUTES")
    }
    stages {
        stage('Checkout') {
            steps {
                cleanWs()
                checkout scm
            }
        }
        stage("Check Runtime Image") {
            steps {
                script {
                    sh """
                        sudo sed -i "s/PROJECT_NAME/${PROJECT_NAME}/g" Dockerfile
                        cat Dockerfile
                        sudo sed -i "s/PROJECT_NAME/${PROJECT_NAME}-${NODE_ENV}/g" docker-compose.yaml
                        sudo sed -i "s/EXPOSE_PORT/${EXPOSE_PORT}/g" docker-compose.yaml
                        cat docker-compose.yaml
                    """

                    def projectRuntimeDockerImageExists = !sh(returnStatus: true, script: "sudo docker inspect ${PROJECT_NAME}-runtime:latest")
                    println "Project Runtime Docker Image Exists: ${projectRuntimeDockerImageExists}"

                    env.GIT_CHANGE_FILE_LIST = sh(returnStdout: true, script: 'git diff --name-only HEAD~1').trim().replaceAll("\\n", " ")
                    println "Change File List Of Nearest Commit: ${GIT_CHANGE_FILE_LIST}"

                    def runtimeDockerfileChanged = env.GIT_CHANGE_FILE_LIST.contains("RuntimeDockerfile")
                    println "Need rebuild Runtime Docker Image: ${runtimeDockerfileChanged}"

                    def nodeRequireModulesChanged = env.GIT_CHANGE_FILE_LIST.contains("package.json")
                    println "Has Node Require Modules been changed: ${nodeRequireModulesChanged}"

                    if (projectRuntimeDockerImageExists) {
                        if (runtimeDockerfileChanged || nodeRequireModulesChanged) {
                            sh "sudo docker rmi -f ${PROJECT_NAME}-runtime:latest"
                            sh "sudo docker build --no-cache -f ./RuntimeDockerfile -t ${PROJECT_NAME}-runtime:latest ."
                        }
                    } else {
                        sh "sudo docker build --no-cache -f ./RuntimeDockerfile -t ${PROJECT_NAME}-runtime:latest ."
                    }
                }
            }
        }
        stage("Build Image") {
            steps {
                script {
                    sh "sudo cp -f /mnt/data/runtime-env/${PROJECT_NAME}-${NODE_ENV}-env ./.env"

                    def projectDockerImageExists = !sh(returnStatus: true, script: "sudo docker inspect ${PROJECT_NAME}-${NODE_ENV}:latest")
                    println "Project Docker Image Exists: ${projectDockerImageExists}"

                    def projectDockerContainerExists = !sh(returnStatus: true, script: "sudo docker inspect ${PROJECT_NAME}-${NODE_ENV}")
                    println "Project Docker Container Exists: ${projectDockerContainerExists}"

                    if (projectDockerImageExists) {
                        if (projectDockerContainerExists) {
                            sh "sudo docker-compose down"
                        }
                        sh "sudo docker rmi -f ${PROJECT_NAME}-${NODE_ENV}:latest"
                    }
                    sh "sudo docker build --no-cache -t ${PROJECT_NAME}-${NODE_ENV}:latest ."
                }
            }
        }
        stage("Deploy") {
            steps {
                script {
                    sh "sudo docker-compose down"
                    sh "sudo docker-compose up -d --build"
                }
            }
        }
    }
    post {
        always {
            emailext subject: "[Auto Deploy] - AIGC portal ${NODE_ENV.capitalize()} Build Result",
                body: '''${SCRIPT, template="managed:Groovy Email Build Result Template"}''',
                to: 'tuobao@materia-logic.com; kgb@materia-logic.com; ${DEFAULT_RECIPIENTS}',
                mimeType: "text/html"
        }
    }
}
