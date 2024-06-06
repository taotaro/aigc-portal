import React from "react";
import useTranslation from 'next-translate/useTranslation'

export default function Footer() {
	const { t } = useTranslation('common');

	return (
		<section className="agile-footer w3ls-section py-5">
			<div className="container">
				<div className="agileits_w3layouts-footer-bottom">
					<div className="row w3_agile-footer-grids py-5 my-4">
						<div className="col-lg-4 w3_agile-footer1 f1">
							<h2 className="mb-3">
								<a href="/">{t('HKT')}</a>
							</h2>
							<p>{t('HKTSlogan')}</p>
						</div>
						<div className="col-lg-6 col-md-9 mt-lg-0 mt-4 row w3_agile-footer1 f2">
							<div className="col-md-4 col-sm-4 mb-sm-0 mb-4 inner-li">
								<h5 className="mb-3"><a href="/services" style={{ color: '#fff' }}>{t('OurServices')}</a></h5>
								<ul className="w3ls-footer-bottom-list">

									<li>
										<a href="/features">{t('BenefitsOfTaxiLicense')}</a>
									</li>
									<li>
										<a href="/invest">{t('InvestmentModel')}</a>
									</li>
									<li>
										<a href="/news">{t('LatestMarketInformation')}</a>
									</li>
								</ul>
							</div>
							<div className="col-md-4 col-sm-4 col-xs-4 inner-li">
								<h5 className="mb-3">{t('ServiceSupport')}</h5>
								<ul className="w3ls-footer-bottom-list">
									<li>
										<a href="/intro">{t('Introduction')}</a>
									</li>
									<li>
										<a href="/questions">{t('CommonProblem')}</a>
									</li>
									<li>
										<a href="/business">{t('BuyingAndSellingNotice')}</a>
									</li>
									<li>
										<a href="/disclaim">{t('disclaimerTitle')}</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-lg-2 col-md-3 mt-lg-0 mt-4 w3_agile-footer1 f3">
							<h5 className="mb-3">{t('NeedHelp')}？</h5>
							<ul className="footer-social-icons">
								<li>
									<a href="/contact">{t('ContactUs')}</a>
								</li>
								<li>
									<a href="https://www.facebook.com/HKTEC-%E9%A6%99%E6%B8%AF%E7%9A%84%E5%A3%AB%E4%BA%A4%E6%98%93%E4%B8%AD%E5%BF%83-104057051753319/" target="__blank">Facebook</a>
								</li>
								<li>
									<a href="https://wa.link/ajaqub" target="__blank">WhatsApp</a>
								</li>
								<li>
									<a rel="noopener" href="mailto:info@hk-tec.org" target="__blank">Email</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="agileits_w3layouts-copyright text-center">
					<p>
						Copyright &copy; <i>HKTEC 香港的士交易中心 </i>. All rights
						reserved.
					</p>
				</div>
			</div>
		</section>
	);
}
