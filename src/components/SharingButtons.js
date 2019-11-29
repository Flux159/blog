import React from "react";
import {
  Twitter,
  Facebook,
  Linkedin,
  Reddit,
  Mail,
  HackerNews
} from "react-social-sharing";

export const SharingButtons = ({link, message}) => {
    const style = {borderRadius: 35, width: 35, height: 35, paddingTop: 10};
    if (link == null && typeof window !== 'undefined') {
        link = window.location.href;
    }

    return (<div>
        <Facebook solid small style={style} message={message} link={link} />
        <Twitter solid small style={style} message={message} link={link} />
        <Linkedin solid small style={style} message={message} link={link} /> 
        <Reddit solid small style={style} message={message} link={link} />
        <Mail solid small style={style} message={message} link={link} />
        <HackerNews solid small style={style} message={message} link={link} /> 
    </div>);
};
