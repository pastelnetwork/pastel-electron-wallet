import styled from 'styled-components'

const Container = styled.div`
  margin: 16px;
`

const Message = styled.div`
  display: grid;
  width: 100%;
  height: 97vh;
  background: #212326;
  grid-template-columns: 350px auto;
  grid-template-rows: 60px auto 60px;
  grid-column-gap: 1px;
  grid-row-gap: 1px;
`

const Sidebar = styled.div`
  position: relative;
  -webkit-overflow-scrolling: touch;
  background: #212326;
  grid-row-start: 1;
  grid-row-end: span 3;
  color: black;
`

const Content = styled.div`
  position: relative;
  -webkit-overflow-scrolling: touch;
  background: #282a2d;
  grid-row-start: 1;
  grid-row-end: span 3;
  margin-left: 20px;
`

const WrapperLoading = styled.div`
  height: calc(100% - 156px);
  margin-top: 20px;
`

const WrapperSkeletonLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px 10px 20px;
  padding: 5px;
  background-color: #2c2c30;
  border-radius: 10px;
`

const SkeletonRight = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
`

const WrapperNotData2 = styled.div`
  height: calc(100% - 156px);
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const SkeletonTop = styled.div`
  height: 75px;
  display: flex;
  align-items: center;
  background-color: #212326;
`

const SkeletonBottom = styled.div`
  margin-top: 30px;
  flex: 1;
`

export {
  Container,
  Message,
  Sidebar,
  Content,
  WrapperLoading,
  WrapperSkeletonLeft,
  SkeletonRight,
  WrapperNotData2,
  SkeletonTop,
  SkeletonBottom,
}
