import React from 'react';
import useTranslation from 'next-translate/useTranslation'

export default function Slider(props) {
	const { sliders = [] } = props || {};
	const { lang } = useTranslation('common');
	const isZhHK = lang === 'hk';

	const slidersJsx = sliders.map((item, i) => {
		return <li>
			<div className={`slider-img${i + 1}`} style={{ background: `url("${item.imageUrl}") no-repeat 0px 0px`, backgroundSize: 'cover' }}>
				<div className="dot">
					<div className="container">
						<div className="slider_banner_info_w3ls">
							<h1 className="text-uppercase mb-5">{item[isZhHK ? 'titlezhHK' : 'title']}<br></br><h3 style={{ whiteSpace: 'pre-line' }}>{item[isZhHK ? 'subTitlezhHK' : 'subTitle']}</h3></h1>
							{/* {item.buttonText && <Link to={item.jumpUrl} className="read" >{item.buttonText}</Link>} */}
							{item.buttonText && <a href={item.jumpUrl} className="read" target="__blank" role="button">{item[isZhHK ? 'buttonTextzhHK' : 'buttonText']}</a>}
						</div>
					</div>
				</div>
			</div>
		</li>
	});
	return (
		<div className="slider clearfix">
			<div className="callbacks_container">
				<ul className="rslides callbacks callbacks1" id="slider4">
					{slidersJsx}
				</ul>
			</div>
		</div>
	);
};