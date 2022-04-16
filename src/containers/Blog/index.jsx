import React from 'react';
import styled from 'styled-components';
import { imageUrls,
  titles,
  hashTags,
  redirectUrls } from './constants/constants';

const Container = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const BlogItem = styled.div`
  order: 2;
  width: 400px;
  height: 100%;
  margin-bottom: 2%;
  margin-right: 3%;
`;

const BlogImage = styled.img`
  height: 180px;
  max-width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  color: white;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const HashTags = styled.h4`
  color: white;
  text-align: center;
`;

const BlogContainer = () => (
  <Container>
    {imageUrls.map((url, index) => (
      <BlogItem>
        <BlogImage src={url} />
        <Title onClick={() => window.open(redirectUrls[index], '_blank')}>
          {titles[index]}
        </Title>
        <HashTags>{hashTags[index]}</HashTags>
      </BlogItem>
    ))}
  </Container>
);

export default BlogContainer;
