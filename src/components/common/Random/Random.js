import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

import {replaceTag} from "../../../services/utils/utils";
import {DataAttrColorTheme, DataAttrSize} from "../../../services/consts/common";
import LinkPrimary from "../../ui-kit/links/LinkPrimary/LinkPrimary";
import cn from "classnames";
import MarkPrimary from "../../ui-kit/marks/MarkPrimary/MarkPrimary";


const Random = (props) => {
  const {
    size,
    colorTheme,
    placePic,
    textPrimary,
    textSecondary,
    placeDescBefore,
    placeDescAfter,
    counter,
    textControl,
    additionalClass,
    customTagName
  } = props;
  const CustomTag = replaceTag(`div`, customTagName);

  const componentClasses = cn({
    "random": true,
    [additionalClass]: additionalClass,
  });

  return (
    <CustomTag className={componentClasses}
               data-size={size}
               data-color-theme={colorTheme}
    >
      <div className="random__place-pic">
        {placePic}
      </div>

      <div className="random__content">
        {textPrimary && (
          <span className="random__title">
            {textPrimary}
          </span>
        )}
        <div className="random__wrap">

          {textSecondary && (
            <>
              <div className="random__desc">

                {placeDescBefore && (
                  <span className="random__place-desc-before">
                    {placeDescBefore}
                  </span>
                )}

                {textSecondary}

                {(placeDescAfter || counter) && (
                  <span className="random__place-desc-after">
                    {counter
                      ? <MarkPrimary value={counter}
                                     size={DataAttrSize.M}
                                     colorTheme={DataAttrColorTheme.GRAY_TERTIARY}
                      />
                      : placeDescAfter && placeDescAfter
                    }
                  </span>
                )}
              </div>
            </>
          )}

          {textControl && (
            <LinkPrimary text={textControl}
                         colorTheme={DataAttrColorTheme.BLUE_LIGHT_PRIMARY}
                         customTagName="button"
                         handleClick={props.handleClick}
            />
          )}
        </div>
      </div>
    </CustomTag>
  )
};

Random.propTypes = {
  size: PropTypes.oneOf([DataAttrSize.L, DataAttrSize.M, DataAttrSize.S]),
  colorTheme: PropTypes.oneOf([DataAttrColorTheme.GRAY_PRIMARY, DataAttrColorTheme.BLACK_PRIMARY]),
  placeBefore: PropTypes.node.isRequired,
  textPrimary: PropTypes.string,
  textSecondary: PropTypes.string,
  textControl: PropTypes.string,
  additionalClass: PropTypes.string,
  customTagName: PropTypes.string,
};

export default Random;
