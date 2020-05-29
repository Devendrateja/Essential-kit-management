import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import { SearchBarEl } from './styledComponents'

@observer
class SearchBar extends React.Component {
   render() {
      return <SearchBarEl placeholder='  search...'></SearchBarEl>
   }
}

export default SearchBar
