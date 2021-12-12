import React from 'react';
import styled from 'styled-components';
import { imageUrls,
  titles,
  hashTags,
  redirectUrls } from './constants/constants';

const Container = styled.div`
  margin-top: 30px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;

const BlogItem = styled.div`
  border: 3px solid cornsilk;
  order: 2;
  width: 400px;
  height: 100%;
  margin-bottom: 2%;
  background-color: #808b96;
`;

const BlogImage = styled.img`
  height: 180px;
  max-width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  cursor: pointer;
`;

const HashTags = styled.h4`
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
