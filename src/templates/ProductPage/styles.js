import styled from '@emotion/styled'

export const ProductTitle = styled.h1`
  font-size: 19px;
  margin-bottom: 15px;
  word-break: break-word;
  font-family: 'Helvetica', 'Helvetica', sans-serif;
  font-weight: 400;
  margin: 0 0 0.5rem;
  line-height: 1.3;
`

export const ProductDescription = styled.div`
* {
  padding : 0;
  margin : 0;
}
  max-width: 100%;
  // background: #e2e2e2;
  border: 1px solid #ddd;
  border-radius: 3px;
  box-shadow: 4px 4px 1px #eee;
  margin: 0 auto;
  padding: 5% 10%;
  // font-family: 'Helvetica', 'Helvetica', sans-serif;
  // font-weight: 300;
  strong {
    width: 40%;
    // background: #eaeaea;
    display: inline-block;
    font-weight: 100;
    font-size: 16px;

    // margin: 2px 0;
    padding-left: 4px;
    margin : -2px 0;
    // border-bottom : 1px solid #ddd
  }
  span {
    display: flex;
    width : 100%;
    margin : -6px 0;
    background: #ffffde;
  }
  span:nth-of-type(2n+1) {
    background: #eaeaea;
  }
 


`
// span:nth-of-type(4n + 1) {
//   background: #eaeaea;
//   display: block;
//   margin-top: -10px;
// }
// span:nth-of-type(4n + 3) {
//   background: #ffffde;
//   display: block;
//   margin-top: -10px;
// }
// span:nth-of-type(4n + 1) strong {
//   // background: white;
// }