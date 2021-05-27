import styled from 'styled-components'

export const Skeleton = styled.div`
  background-color: #ddd;
  margin: 5px 0;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(
      to right,
      #d9d9d9 0%,
      rgba(0, 0, 0, 0.2) 20%,
      #d9d9d9 100%
    );
    background-repeat: no-repeat;
    background-size: 450px 400px;
    animation: shimmer 1s linear infinite;
  }
  &.text {
    width: 75%;
    height: 16px;
  }
  &.text.name-skeleton {
    width: 90%;
  }
  &.title {
    width: 50%;
    height: 35px;
    margin-left: 15px;
  }
  &.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 10px;
  }
  &.thumbnail {
    width: 100px;
    height: 100px;
  }
  &.title::before {
    background-image: linear-gradient(
      to right,
      hsla(0, 0%, 100%, 0) 0%,
      rgba(0, 0, 0, 0.2) 20%,
      hsla(0, 0%, 100%, 0) 100%
    );
  }
  &.skeleton-msg-1,
  &.skeleton-msg-2 {
    margin-left: 10px;
    margin-bottom: 5px;
  }
  &.skeleton-msg-1,
  &.skeleton-msg-3 {
    height: 36px !important;
    width: 450px !important;
    background-color: hsla(0, 0%, 100%, 0.05);
    border-radius: 20px;
  }
  &.skeleton-msg-2,
  &.skeleton-msg-4 {
    height: 36px !important;
    width: 300px !important;
    background-color: hsla(0, 0%, 100%, 0.05);
    border-radius: 20px;
  }
  &.skeleton-msg-3,
  &.skeleton-msg-4 {
    margin-left: auto !important;
    margin-right: 10px;
    margin-bottom: 5px;
  }

  @keyframes shimmer {
    0% {
      background-position: -450px 0;
    }

    100% {
      background-position: 450px 0;
    }
  }
`
