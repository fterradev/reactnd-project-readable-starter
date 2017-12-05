import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, ToolbarMenuIcon, ToolbarIcon } from 'rmwc/Toolbar';
import { MenuAnchor, Menu, MenuItem } from 'rmwc/Menu';

class AppToolbar extends Component {
  state = {
    categoryMenuIsOpen: false,
    orderingMenuIsOpen: false
  };
  
  render() {
    const { selectedCategory, onChangeCategory, categoriesStore, onChangeOrdering } = this.props;
    const nullCategoryOption = {
      name: 'All',
      path: ''
    };
    const categoriesOptions = [nullCategoryOption].concat(categoriesStore.items);
    const orderingOptions = [
      {
        name: 'vote score',
        value: '-voteScore'
      },
      {
        name: 'date',
        value: '-timestamp'
      }
    ];
    return (
      <Toolbar>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarMenuIcon use="menu"/>
              <MenuAnchor 
                onClick={evt => this.setState(
                  prevState => ({
                    categoryMenuIsOpen: !prevState.categoryMenuIsOpen
                  })
                )}
                style={{display: 'flex'}}
              >
                <ToolbarTitle>{selectedCategory ? selectedCategory.name : 'All'}</ToolbarTitle>
                <ToolbarIcon use="arrow_drop_down" style={{paddingLeft: 0}} />
                <Menu
                  open={this.state.categoryMenuIsOpen}
                  onClose={evt => this.setState({categoryMenuIsOpen: false})}
                  onSelected={evt => onChangeCategory(
                    categoriesOptions[evt.detail.index].path
                  )}
                >
                  {categoriesOptions.map(({ name }) => 
                    <MenuItem key={name}>{name}</MenuItem>
                  )}
                </Menu>
              </MenuAnchor>
          </ToolbarSection>
          <ToolbarSection alignEnd>
            <MenuAnchor
              onClick={evt => this.setState(
                prevState => ({
                  orderingMenuIsOpen: !prevState.orderingMenuIsOpen
                })
              )}
              style={{display: 'flex'}}
            >
              <ToolbarIcon use="more_vert"/>
              <Menu
                open={this.state.orderingMenuIsOpen}
                onClose={evt => this.setState({orderingMenuIsOpen: false})}
                onSelected={evt => onChangeOrdering(
                  categoriesOptions[evt.detail.index].value
                )}
              >
                {orderingOptions.map(({ name }) =>
                  <MenuItem key={name}>Order by {name}</MenuItem>
                )}
              </Menu>
            </MenuAnchor>
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