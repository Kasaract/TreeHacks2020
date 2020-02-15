import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch, faShare, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as unBookmark} from '@fortawesome/free-regular-svg-icons';

import './ArticleCard.scss';
import filler from './filler_img.jpg';

const ArticleCard = ({ title, author, source, preview, image, link, saved }) => {
	return (
		<Card
			className="my-3 mx-1 cardParent"
			style={{ width: '16rem', overflow: 'hidden', borderRadius: '1rem' }}
		>
			<a href={link} target="_blank" rel="noreferrer noopener">
				<Card.Img variant="top" src={filler} />
			</a>
			<Card.Body className="p-2">
				<a href={link} target="_blank" rel="noreferrer noopener">
					<Card.Title style={{ fontSize: '1.05rem' }}>{title}</Card.Title>
				</a>
				<Card.Subtitle
					className="mb-2 font-italic font-weight-light d-flex justify-content-between"
					style={{ fontSize: '0.75rem' }}
				>
					<div>{`${source} ${author}`} </div>
					<div className="icons">
                        {saved ?
                            <FontAwesomeIcon icon={faBookmark}/> :
                            <FontAwesomeIcon icon={unBookmark}/>
                        }
						<FontAwesomeIcon icon={faCodeBranch} />
					</div>
				</Card.Subtitle>
				<Card.Text style={{ fontSize: '0.85rem' }}>
					{preview
						.split(' ')
						.slice(0, 15)
						.join(' ')}
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default ArticleCard;
