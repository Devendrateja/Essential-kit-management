import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import { Container, Span } from './styledComponents'

import FormComponent from '../FormComponent'

@observer
class ListOfForms extends React.Component {
   
   
   render() {
      let count = 0
      const {
         listOfForms,
         createFormComponent,
         getStatusOfForm,
         onSelectForm
      } = this.props
   
      return (
         <div>
            {
               listOfForms.length !== 0 &&
                  listOfForms.map((eachForm, index) => {
                     return (
                        <FormComponent
                           key={eachForm.formId}
                           onSelectForm={onSelectForm}
                           sno={index + 1}
                           newForm={eachForm}
                           getStatusOfForm={getStatusOfForm}
                        />
                     )
                  })
            }
         </div>
      )
   }
}

export default ListOfForms
