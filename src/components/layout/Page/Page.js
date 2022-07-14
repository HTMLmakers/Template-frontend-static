import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

import "./styles.scss";


const Page = (props) => {
  const {
    headerContent,
    beforeAddContent,
    sideBarPrimaryContent,
    footerContent,
    sideBarSecondaryContent,
    additionalClass,
    ...rest
  } = props;

  const componentClasses = cn({
    "page": true,
    [additionalClass]: additionalClass,
  });

  return (
    <div className={componentClasses}
         {...rest}
    >
      <div className="page__wrap">
        {headerContent && (
          <header className="page__header">
            {headerContent}
          </header>
        )}

        <div className="page__base">
          {sideBarPrimaryContent && (
            <aside className="page__sidebar-primary">
              {sideBarPrimaryContent}
            </aside>
          )}

          <div className="page__base-wrap">
            {beforeAddContent && (
              <div className="page__add">
                {beforeAddContent}
              </div>
            )}

            <main className="page__main">
              {props.children}
            </main>
          </div>
        </div>

        {footerContent && (
          <footer className="page__footer">
            {footerContent}
          </footer>
        )}
      </div>

      {sideBarSecondaryContent && (
        <aside className="page__sidebar-secondary">
          {sideBarSecondaryContent}
        </aside>
      )}
    </div>
  )
};

Page.propTypes = {
  children: PropTypes.element.isRequired,
  headerContent: PropTypes.element,
  beforeAddContent: PropTypes.element,
  sideBarPrimaryContent: PropTypes.element,
  footerContent: PropTypes.element,
  sideBarSecondaryContent: PropTypes.element,
  additionalClass: PropTypes.string,
};

export default Page;
