import {NavLink} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

import {LocationMenu} from "../../../services/consts/common";

const AdaptiveLink = (props) => {
  const {url, target, locationMenu, ...rest} = props;

  let elem;

  const getActive = (match, location) => {
    const defaultActive = location.pathname === url;
    const customActive = location.pathname.includes(url)

    /*const customActive = locationMenu &&
      (
        ([LocationMenu.CALCULATOR, LocationMenu.DEBTOR].includes(locationMenu) && (url === `/`))
        || (locationMenu === LocationMenu.CORE && url === `/profile` && (
          [`/profile`, `/personal-account`, `/deposit-account`, `/payed-modules`, `/invoices`].some(it => location.pathname.includes(it))
        ))
        || (locationMenu === LocationMenu.CORE && url === `/` && (
          [`flat`].some(it => location.pathname.includes(it))
        ))
        || (locationMenu === LocationMenu.CORE && url === `/companies` && (
          [`compan`].some(it => location.pathname.includes(it))
        ))
      )*/

    return defaultActive || customActive
  }

  if (url.includes(`http`)) {
    elem = (
      <a href={url} target={target} {...rest}>
        {props.children}
      </a>
    )
  } else {
    elem = (
      <NavLink to={url}
               isActive={(match, location) => getActive(match, location)}
               {...rest}
      >
        {props.children}
      </NavLink>
    )
  }

  return elem;
};

AdaptiveLink.propTypes = {
  url: PropTypes.string.isRequired,
};

export default AdaptiveLink;