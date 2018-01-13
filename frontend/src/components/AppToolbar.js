import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
  ToolbarIcon
} from 'rmwc/Toolbar';
import { MenuAnchor, MenuItem, SimpleMenu } from 'rmwc/Menu';
import orderingOptions from '../orderingOptions';

class AppToolbar extends Component {
  state = {
    categoryMenuIsOpen: false,
    orderingMenuIsOpen: false
  };

  render() {
    const {
      selectedCategory,
      onChangeCategory,
      categoriesStore,
      onChangeOrdering,
      onOpenLogin,
      showOrderingMenu
    } = this.props;
    const nullCategoryOption = {
      name: 'All',
      path: ''
    };
    const categoriesOptions = [nullCategoryOption].concat(
      categoriesStore.items
    );
    const orderingOptionsArray = Object.keys(orderingOptions).map(
      optionKey => orderingOptions[optionKey]
    );
    return (
      <Toolbar>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarMenuIcon use="menu" title="No real menu here :P" />
            <MenuAnchor
              onClick={evt =>
                this.setState(prevState => ({
                  categoryMenuIsOpen: !prevState.categoryMenuIsOpen
                }))
              }
              style={{ display: 'flex' }}
            >
              <ToolbarTitle>
                {selectedCategory ? selectedCategory.name : 'All'}
              </ToolbarTitle>
              <ToolbarIcon use="arrow_drop_down" style={{ paddingLeft: 0 }} />
              <SimpleMenu
                open={this.state.categoryMenuIsOpen}
                onClose={evt => this.setState({ categoryMenuIsOpen: false })}
                onSelected={evt =>
                  onChangeCategory(categoriesOptions[evt.detail.index].path)
                }
              >
                {categoriesOptions.map(({ name }) => (
                  <MenuItem key={name}>{name}</MenuItem>
                ))}
              </SimpleMenu>
            </MenuAnchor>
          </ToolbarSection>
          <ToolbarSection alignEnd>
            {showOrderingMenu && (
              <MenuAnchor
                onClick={evt =>
                  this.setState(prevState => ({
                    orderingMenuIsOpen: !prevState.orderingMenuIsOpen
                  }))
                }
                style={{ display: 'flex' }}
              >
                <ToolbarIcon use="more_vert" />
                <SimpleMenu
                  open={this.state.orderingMenuIsOpen}
                  onClose={evt => this.setState({ orderingMenuIsOpen: false })}
                  onSelected={evt =>
                    onChangeOrdering(
                      orderingOptionsArray[evt.detail.index].value
                    )
                  }
                >
                  {orderingOptionsArray.map(({ name }) => (
                    <MenuItem key={name}>Order by {name}</MenuItem>
                  ))}
                </SimpleMenu>
              </MenuAnchor>
            )}
            <ToolbarIcon onClick={onOpenLogin} use="person" />
          </ToolbarSection>
        </ToolbarRow>
      </Toolbar>
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categoriesStore: categories
  };
}

export default connect(mapStateToProps)(AppToolbar);
