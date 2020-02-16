import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCodeBranch,
	faShare as unBookmark,
	faBookmark
} from '@fortawesome/free-solid-svg-icons';
// import { faBookmark as unBookmark} from '@fortawesome/free-regular-svg-icons';

import './ArticleCard.scss';
import filler from './filler_img.jpg';

const ArticleCard = ({
	title,
	author,
	source,
	preview,
	image,
	link,
	saved,
	onClick
}) => {
	return (
		<Card
			className="mt-1 mb-3 mx-1 cardParent"
			style={{ width: '12rem', overflow: 'hidden', borderRadius: '1rem' }}
			onClick={() => onClick()}
		>
			<a href={link} target="_blank" rel="noreferrer noopener">
				<Card.Img variant="top" src={image} />
			</a>
			<Card.Body className="p-2">
				<a href={link} target="_blank" rel="noreferrer noopener">
					<Card.Title style={{ fontSize: '0.85rem' }}>{title}</Card.Title>
				</a>
				<Card.Subtitle
					className="mb-2 font-italic font-weight-light d-flex justify-content-between"
					style={{ fontSize: '0.70rem' }}
				>
					<div>{`${source} ${author}`} </div>
					<div className="icons">
						{saved ? (
							<FontAwesomeIcon icon={faBookmark} />
						) : (
							<FontAwesomeIcon icon={unBookmark} />
						)}
						<FontAwesomeIcon icon={faCodeBranch} />
					</div>
				</Card.Subtitle>
				<Card.Text style={{ fontSize: '0.75rem' }}>
                    {preview ? (
                        preview.split(' ').slice(0, 15).join(' ')
                    ) : (
                        "no preview available!"
                    )

                    }
					{'...'}
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default ArticleCard;
