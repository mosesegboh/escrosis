import React from 'react';
import { SearchBar } from 'react-native-elements';

export default class Searcher extends React.Component {
    constructor(props){
    super(props);

    state = {
        search: '',
        datasource: ['apple', 'banana', 'cow', 'dex', 'zee', 'orange', 'air', 'bottle'],
        colors: ['#84DCC6', '#FEC8C8', '#F7E4CF', "#E8DEF3",],
        filtered: datasource,
        searching: false,
      };
    }



  

  updateSearch = (search) => {
    if (text) {
        // if(optionValue){
        //   setSearching(false)
        // }

        setSearching(true)
        const temp = text.toLowerCase()
  
        const tempList = dataSource.filter(item => {
          if (item.match(temp))
            return item
        })
        setFiltered(tempList)
        // console.log(option)
      }




    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}