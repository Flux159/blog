import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

import styled, { css } from "styled-components";

const focus = css`
  background: white;
  color: ${props => props.theme.darkBlue};
  cursor: text;
  width: 5em;
`
const collapse = css`
  width: 0;
  cursor: pointer;
  color: ${props => props.theme.lightBlue};
  ${props => props.focus && focus}
  margin-left: ${props => (props.focus ? `-1.6em` : `-1em`)};
  padding-left: ${props => (props.focus ? `1.6em` : `1em`)};
  ::placeholder {
    color: ${props => props.theme.gray};
  }
`
const expand = css`
  background: ${props => props.theme.veryLightGray};
  width: 6em;
  margin-left: -1.6em;
  padding-left: 1.6em;
`
const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  background: white;
  transition: ${props => props.theme.shortTrans};
  border-radius: ${props => props.theme.smallBorderRadius};
  {hightlight-next-line}
  ${props => (props.collapse ? collapse : expand)};
`
const Form = styled.form`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`

export default connectSearchBox(({ refine, ...rest }) => {
  const searchCustom = '';
  const preventSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <Form className={'formElement'} onSubmit={preventSubmit}>
      <Input
        className={'searchInput ' + searchCustom}
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={e => refine(e.target.value)}
        {...rest}
      />
    </Form>
  )}
);