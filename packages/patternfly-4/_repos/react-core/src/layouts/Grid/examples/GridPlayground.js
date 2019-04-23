import React from 'react';
import { Grid, GridItem, Button } from '@patternfly/react-core';
import ItemControl from './ItemControl';

export default class GridPlayground extends React.Component {
  constructor(props) {
    super(props);
    this.currentId = 1;
    this.state = {
      gridItems: [this.createGridItem(), this.createGridItem(), this.createGridItem(), this.createGridItem()]
    };
    this.handleAddGridItem = () => {
      this.setState(({ gridItems }) => ({
        gridItems: [...gridItems, this.createGridItem()]
      }));
    };
    this.handleGridItemUpdate = (id, updates) => {
      const index = this.state.gridItems.findIndex(i => i.id === id);
      const updatedItem = {
        ...this.state.gridItems[index],
        ...updates
      };
      this.setState({
        gridItems: [...this.state.gridItems.slice(0, index), updatedItem, ...this.state.gridItems.slice(index + 1)]
      });
    };
  }

  createGridItem() {
    return {
      id: this.currentId++,
      span: 3,
      rowSpan: 1,
      offset: 1
    };
  }

  render() {
    return (
      <Grid gutter="md">
        <GridItem span={9}>
          <Grid gutter="sm">
            {this.state.gridItems.map(({ id, span, rowSpan, offset }) => (
              <GridItem key={id} span={+span} rowSpan={+rowSpan} offset={+offset}>
                {id}
              </GridItem>
            ))}
          </Grid>
        </GridItem>
        <GridItem span={3}>
          <Button isBlock onClick={this.handleAddGridItem}>
            Add Item
          </Button>
          <div>
            {this.state.gridItems.map(item => (
              <ItemControl
                key={item.id}
                id={item.id}
                span={+item.span}
                rowSpan={+item.rowSpan}
                offset={+item.offset}
                onUpdateItem={this.handleGridItemUpdate}
              />
            ))}
          </div>
        </GridItem>
      </Grid>
    );
  }
}
