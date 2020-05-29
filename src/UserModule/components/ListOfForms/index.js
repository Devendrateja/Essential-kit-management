import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import { Container, Span } from './styledComponents'


import FormComponent from '../FormComponent'

@observer
class ListOfForms extends React.Component {
   render() {
      let count = 0
      const { listOfForms, createFormComponent, getStatusOfForm,onSelectForm } = this.props
      console.log(listOfForms, 'listOfForms')
      return (
         <div>
            {listOfForms.length !== 0 &&
               listOfForms.map(eachForm => {
                  count += 1
                  const newForm = createFormComponent(eachForm)
                  return (
                     <FormComponent
                        key={newForm.formName}
                        onSelectForm={onSelectForm}
                        sno={count}
                        newForm={newForm}
                        getStatusOfForm={getStatusOfForm}
                     />
                  )
               })}
         </div>
      )
   }
}

export default ListOfForms