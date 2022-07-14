import React from "react";
import PropTypes from "prop-types";

import {ReactComponent as IconDropdown8} from "../../../../assets/img/icons/svg/8/icon-dropdown-8.svg";

import {DataAttrColorTheme, DataAttrSize, ElementPosition} from "../../../../services/consts/common";
import {lastNameAndInitials} from "../../../../services/utils/utils";


import ButtonUser from "../../../ui-kit/buttons/ButtonUser/ButtonUser";
import Avatar from "../../Avatar/Avatar";
import Icon from "../../../ui-kit/icons/Icon/Icon";
import DropDown from "../../../ui-kit/DropDown/DropDown";

const UserNav = (props) => {
  const { navContent, person } = props;


  return (
    <DropDown dropDownContent={navContent}
              position={ElementPosition.RIGHT}
    >
      <ButtonUser additionalClass="main-header__control-user"
                  textPrimary={lastNameAndInitials(person)}
                  placeBefore={<Avatar size={DataAttrSize.S}
                                       colorTheme={DataAttrColorTheme.ORANGE_PRIMARY}
                                       imageSrc={`${process.env.REACT_APP_URL}${person?.avatar}`}
                                       lastName={person.lastName}
                                       firstName={person.firstName} />}
                  placeAfter={<Icon size={DataAttrSize.XS} icon={<IconDropdown8 />} />}
      />
    </DropDown>
  )
};

UserNav.propTypes = {
  navContent: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    lists: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      content: PropTypes.node,
      disabled: PropTypes.bool
    })).isRequired,
  })).isRequired,
  person: PropTypes.object.isRequired,
};

export default UserNav;
