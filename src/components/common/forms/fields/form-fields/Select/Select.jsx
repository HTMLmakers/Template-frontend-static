import React, {useRef, useState} from "react";
import ReactSelect, {components} from "react-select";

import "./styles.scss";

import Scroll from "../../../../../ui-kit/Scroll/Scroll";
import {ReactComponent as IconDropdown8} from "../../../../../../assets/img/icons/svg/8/icon-dropdown-8.svg";
import {ReactComponent as IconSearch24} from "../../../../../../assets/img/icons/svg/24/icon-search-24.svg";

import {DataAttrColorTheme, DataAttrSize, FieldValidateThemeName} from "../../../../../../services/consts/common";
import {useOnClickOutside} from "../../../../../../services/hooks/hooks";


import ButtonPrimary from "../../../../../ui-kit/buttons/ButtonPrimary/ButtonPrimary";
import InputText from "../InputText/InputText";
import Icon from "../../../../../ui-kit/icons/Icon/Icon";
import {ReactComponent as IconSortDown24} from "../../../../../../assets/img/icons/svg/24/icon-sort-down-24.svg";
import PropTypes from "prop-types";


const customStyles = {
  container: (base) => ({
    ...base,
    width: 300,
    zIndex: 10,
  }),
  menu: (base) => ({
    ...base,
    minHeight: 100,
    position: `relative`,
  }),
  menuList: (base) => ({
    minHeight: 100
  })
};

const MenuList = props => (
  <components.MenuList {...props}>
    <Scroll>
      {props.children}
    </Scroll>
  </components.MenuList>
);

const IndicatorSeparator = ({ innerProps }) => null;
const DropdownIndicator = () => null;


/*options={[
  {value: 1, label: `опция 1`},
  {value: 2, label: `опция 2`},
]}*/


const Select = (props) => {
  const {
    id,
    name,
    options,
    colorTheme,
    customTriggerComponent,
    isSearchable,
    value,
    onChange,
    isBeforeSeparator,
    isButtonTrigger,
    triggerText,
    triggerColorTheme,
    triggerPlaceBefore,
    triggerMinWidth,
    isSorting,
    handleSorting,
    ...rest
  } = props;

  const Control = (props) => (
    isSearchable
    ? <components.Control {...props}>
        <IconSearch24/>
        {props.children}
      </components.Control>
      : null
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isSortingToggle, setIsSortingToggle] = useState(false);
  const selectWrapRef = useRef();

  useOnClickOutside(selectWrapRef, () => setIsOpen(false));

  const customComponents = { MenuList, IndicatorSeparator, DropdownIndicator, Control};

  const toggleOpen = () => setIsOpen(!isOpen);

  const onSelectChange = (e) => {
    toggleOpen();
    onChange(e);
  };

  const handleIconSorting = () => {
    setIsSortingToggle(!isSortingToggle);
    handleSorting(isSortingToggle);
  };

  const renderTrigger = () => {
    if (customTriggerComponent) return customTriggerComponent;
    if (!customTriggerComponent && !isButtonTrigger) {
      return (
        <InputText id={id}
                   size={DataAttrSize.L}
                   width="fullwidth"
                   placeAfter={<Icon size={DataAttrSize.XS}
                                     icon={<IconDropdown8 />}
                                     onClick={() => {
                                       toggleOpen()
                                       console.log(`sfsdfsdfds`)
                                     }}
                   />}
                   value={value ? value?.label : 'Введите значение'}
                   onChange={() => ``}
                   onClick={toggleOpen}
        />
      )
    }
    if (!customTriggerComponent && isButtonTrigger) {
      let defaultSortingProps = {
        isBeforeSeparator: true,
        text: `Сортировать по: `,
        placeBefore : <Icon size={DataAttrSize.M}
                            icon={<IconSortDown24 />}
                            additionalClass={isSortingToggle ? `icon-reverse` : null }
                            handleClick={handleIconSorting} />,
        colorTheme: DataAttrColorTheme.WHITE_PRIMARY,
      };

      let sortingProps = isSorting ? defaultSortingProps : {};

      return (
        <ButtonPrimary id={id}
                       isBeforeSeparator={isBeforeSeparator}
                       text={value ? triggerText : 'Выберете значение'}
                       textValue={value?.label}
                       size={DataAttrSize.L}
                       colorTheme={triggerColorTheme}
                       placeBefore={triggerPlaceBefore}
                       placeAfter={<Icon size={DataAttrSize.XS} icon={<IconDropdown8 />} />}
                       minWidth={triggerMinWidth}
                       handleClick={toggleOpen}
                       {...sortingProps}

        />
      )
    }
  };

  return (
    <div className="select"
         style={{display: "inline-block"}}
         ref={selectWrapRef}
         data-color-theme={colorTheme}
    >
      <div style={{position: "relative"}}>
        {renderTrigger()}

        {isOpen && (
          <div style={{position: "absolute", left: "0", top: "50px"}}>
            <ReactSelect
              styles={customStyles}
              components={customComponents}
              captureMenuScroll={false}
              autoFocus
              controlShouldRenderValue={false}
              hideSelectedOptions={false}
              isClearable={false}
              menuIsOpen
              placeholder={`Поиск`}
              tabSelectsValue={false}
              noOptionsMessage={() => `Ничего нет`}
              options={options}
              value={value}
              onChange={(e) => onSelectChange(e)}
              {...rest}
            />
          </div>
        )}
      </div>
    </div>
  )
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.exact({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.exact({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })]).isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  colorTheme: PropTypes.oneOf([DataAttrColorTheme.RED_PRIMARY, DataAttrColorTheme.GREEN_PRIMARY]),
  triggerColorTheme: PropTypes.oneOf([
    DataAttrColorTheme.BLUE_PRIMARY,
    DataAttrColorTheme.BLUE_SECONDARY,
    DataAttrColorTheme.GRAY_PRIMARY,
    DataAttrColorTheme.GRAY_QUATERNARY,
    DataAttrColorTheme.WHITE_PRIMARY,
    DataAttrColorTheme.WHITE_SECONDARY,
    DataAttrColorTheme.RED_PRIMARY,
    DataAttrColorTheme.ORANGE_PRIMARY_LIGHT,
    FieldValidateThemeName.ERROR,
    FieldValidateThemeName.SUCCESS
  ]),
  customTriggerComponent: PropTypes.element,
  isButtonTrigger: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isBeforeSeparator: PropTypes.bool,
  triggerText: PropTypes.string,
  triggerPlaceBefore: PropTypes.node,
  isSorting: PropTypes.bool,
  handleSorting: PropTypes.func,
  triggerMinWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Select;
