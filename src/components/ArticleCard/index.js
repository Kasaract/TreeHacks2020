import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch, faShare } from '@fortawesome/free-solid-svg-icons';

const ArticleCard = ({ title, author, source, preview }) => {
  return (
    <Card>
      <Card.Img />
      <Card.Body>
        <div className="h2">{title}</div>
        <Row>
          <Row>
            <div>{author}</div>
            <div>{source}</div>
          </Row>
          <Row>
            <FontAwesomeIcon icon={faCodeBranch} />
            <FontAwesomeIcon icon={faShare} />
          </Row>
        </Row>
        <div>{preview}</div>
      </Card.Body>
    </Card>
  );
};

export default ArticleCard;