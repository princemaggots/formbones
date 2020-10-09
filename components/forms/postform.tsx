import axios from 'axios'

import * as React from 'react';
 import * as ReactDOM from 'react-dom';
 import {
   Formik,
   FormikHelpers,
   FormikProps,
   Form,
   Field,
   FieldProps,
 } from 'formik';
import { useState } from 'react';
import Router from 'react-router';
import { Redirect } from 'react-router-dom';
import { useRouter } from 'next/router';
 
 interface CharacterValues {
   id: number;
   characterName: string;
   fandom: string;
   description: string;
   DOB: string;
   likes: string;
   dislikes: string;
   mbti: string;
   ennegram: string;
   moralAlignment: string;
 }

 const myInput = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
};
 
const PostForm: React.FC<{
  initialValues: CharacterValues
}> = ({ initialValues }) => {
  const [toDir, setToDir] = useState(false)
  const router = useRouter()
   return (
     <div>
       <h1>New Character</h1>
       <Formik
          initialValues={ initialValues }
          onSubmit={(
            values: CharacterValues,
            { setSubmitting }: FormikHelpers<CharacterValues>
          ) => {
            setSubmitting(false);
            axios.post(
              '/api/directory/savecharacter',
              values
            ).then(() => {
              router.push('/directory')
            })

          }}
        >

     {/* hi!!! remember to fix the css and edit the textarea to match. thanks 
     image, name, fandom, description, category (tags). additional has DOB, likes, dislikes, mbti, ennegram, moral alignment */}

         <Form> 
         <Field type="hidden" id="id" name="id" />

          <label htmlFor="characterName">Name</label>
          <Field id="characterName" name="characterName" />

          <label htmlFor="Fandom">Fandom</label>
          <Field id="fandom" name="fandom" />

          <label htmlFor="description">Description</label>
          <Field as="textarea" id="description" name="description" />

          <h1> Optional</h1>
          <label htmlFor="DOB">Label</label>
          <Field id="DOB" name="DOB" />

           <button type="submit">
             Submit
           </button>
         </Form>
     </Formik>
   </div>
 );
 }
 
 export default PostForm;

