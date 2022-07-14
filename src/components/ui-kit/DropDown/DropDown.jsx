import React, {createRef, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import cn from "classnames";

import "./styles.scss";

import {DataAttrColorTheme, DataAttrSize, ElementPosition} from "../../../services/consts/common";
import LinkPrimary from "../links/LinkPrimary/LinkPrimary";
import Scroll from "../Scroll/Scroll";
import Icon from "../icons/Icon/Icon";

import {ReactComponent as IconListOrder16} from "../../../../common/assets/img/icons/svg/16/icon-list-order-16.svg";


const reorder = (list, startIndex, endIndex) => {
  let result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);

  result.splice(endIndex, 0, removed);
  return result;
};

const AllowScroll = (props) => {
 return (
   props.isScroll
     ? <Scroll>
         {props.children}
       </Scroll>
     : <>{props.children}</>
 )
};

const DropDown = (props) => {
  const { size, colorTheme, additionalClass, dropDownContent, position, isDraggable, isSearchable, isScrollable } = props;

  const componentClasses = cn({
    "drop-down": true,
    [additionalClass]: additionalClass,
  });

  const dropDownAreaRef = useRef();

  useEffect(() => {
    if (position === ElementPosition.CENTER) {
      setDropDownAreaWidth();
    }
  }, []);

  const setDropDownAreaWidth = () => {
    const width = dropDownAreaRef.current?.offsetWidth;
    dropDownAreaRef.current.style.marginLeft = -(width/2) + 'px';
  };

  const dropDownContentLists = dropDownContent.reduce((resLists, next) => {
    return [...resLists, next.lists]
  }, []);

  const disabledItems = dropDownContentLists.map((item) => {
    return item.reduce((resIds, next, ind) => {
      return next.disabled ? [...resIds, {id: next.id, ind}] : resIds
    }, [])
  });

  const [itemsDnd, setItemsDnd] = useState(dropDownContentLists);

  const dataDisabledProps = (item) => (item.disabled ? {'data-state': 'disabled'} : {});

  const renderIconDragItem = (providedDragHandleProps) => (
    <div className="drop-down-nav__icon-drag" {...providedDragHandleProps}>
      <Icon size={DataAttrSize.S}
            icon={<IconListOrder16 />}
      />
    </div>
  );

  const dropDownItemClick = (itemRef) => {
    const children = itemRef.current.children[0];
    children && children.click();
  };

  const itemRender = (item) => {
    const itemRef = createRef();

    return (
      <div className="drop-down-nav__item" key={item.id} {...dataDisabledProps(item)}>
        <div className="drop-down-nav__item-content" ref={itemRef} onClick={() => dropDownItemClick(itemRef)}>
          {item.content}
        </div>
      </div>
    )
  };

  const  itemDraggableRender = (item, index) => {
    const itemRef = createRef();

    return (
      <Draggable draggableId={`${item.id}`} index={index} key={item.id} isDragDisabled={item?.disabled}>
        {(provided) => (
          <div className="drop-down-nav__item"
               ref={provided.innerRef}
               {...provided.draggableProps}
               {...dataDisabledProps(item)}
          >
            <div className="drop-down-nav__item-content" ref={itemRef} onClick={() => dropDownItemClick(itemRef)}>
              {item.content}
            </div>
            {isDraggable && renderIconDragItem(provided.dragHandleProps)}
          </div>
        )}
      </Draggable>
    )
  };

  const onDragEnd = (result, ind) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    if (disabledItems[ind].find(it => it.ind === result.destination.index)) return;

    //сортируем элементы без учета дизэйбленных елементов
    let items = reorder(itemsDnd[ind], result.source.index, result.destination.index);
    //сортируем элементы с учетом дизэйбленных елементов
    items = disabledItems[ind].reduce((updates, disabled) => {
      let newIndDisabled = updates.findIndex((it) => disabled.id === it.id);
      if (newIndDisabled < 0) return updates;
      const oldItemDisabled = updates[newIndDisabled];
      const elemInOldDisabled = updates[disabled.ind];
      //возвращаем задизейбленный элемент на свой начальный индекс
      updates.splice(disabled.ind, 1, oldItemDisabled);
      //перемещаем элемент из индекса дизейбленного элемента на его место
      updates.splice(newIndDisabled, 1, elemInOldDisabled);

      return updates;
    }, items);

    setItemsDnd([...itemsDnd.slice(0, ind), items, ...itemsDnd.slice(ind + 1)]); // [[], [], ...]
  };

  return (
    <div className={componentClasses}
         data-size={size}
         data-color-theme={colorTheme}
         data-position={position}
         data-drag={isDraggable}
    >
      <div className="drop-down__trigger">
        {props.children}
      </div>
      <div className="drop-down__area" ref={dropDownAreaRef}>
        <div className="drop-down-nav" style={{width: props.width, maxWidth: props.width}}>
          {dropDownContent.map((item, index) => (
            <section className="drop-down-nav__section" key={index}>
              {(item.textControl || item.title) && (
                <div className="drop-down-nav__header">
                  {item.title && (
                    <p className="drop-down-nav__title">
                      {item.title}
                    </p>
                  )}
                  {item.textControl && (
                    <div className="drop-down-nav__control">
                      <LinkPrimary text={item.textControl}
                                   colorTheme={DataAttrColorTheme.BLUE_LIGHT_PRIMARY}
                                   customTagName="button"
                                   handleClick={item.handleClickControl}
                      />
                    </div>
                  )}
                </div>
              )}
              <div className="drop-down-nav__body">
                {isSearchable && index === 0 && (
                  <div className="drop-down-nav__search">
                    <input type="text" style={{width:'100%'}} placeholder="Компонент Search"/>
                  </div>
                )}

                {!isDraggable &&
                  <AllowScroll isScroll={isScrollable}>
                    <div className="drop-down-nav__list">
                      {item.lists.map(itemRender)}
                    </div>
                  </AllowScroll>
                }

                {isDraggable &&
                  <DragDropContext onDragEnd={(res) => onDragEnd(res, index)}>
                    <Droppable droppableId={`drop-down-nav__list${index+1}`}>
                      {provided  => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                          <div className="drop-down-nav__list">
                            <AllowScroll isScroll={isScrollable}>
                              {itemsDnd[index].map((item, index) => itemDraggableRender(item, index))}
                              {provided.placeholder}
                            </AllowScroll>
                          </div>
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                }
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
};

DropDown.propTypes = {
  children: PropTypes.element.isRequired,
  dropDownContent: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    textControl: PropTypes.string,
    handleClickControl: PropTypes.func,
    lists:  PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      content: PropTypes.node,
      disabled: PropTypes.bool
    })).isRequired
  })).isRequired,
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S]),
  colorTheme: PropTypes.oneOf([DataAttrColorTheme.DEFAULT]),
  additionalClass: PropTypes.string,
  position: PropTypes.oneOf([ElementPosition.LEFT, ElementPosition.CENTER, ElementPosition.RIGHT]),
  isSearchable: PropTypes.bool,
  isScrollable: PropTypes.bool,
  isDraggable: PropTypes.bool,
};

export default DropDown;
