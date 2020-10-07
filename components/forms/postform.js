import React from 'react';
 import { Formik, Form, Field, ErrorMessage } from 'formik';
 
 const PostForm = () => (
   <div>

     {/* hi!!! remember to fix the css and edit the textarea to match. thanks 
     image, name, fandom, desc, category (tags). additional has DOB, likes, dislikes, mbti, ennegram, moral alignment */}


     <Formik
       initialValues={{ name: '', fandom: '', desc: '', DOB:'', likes: '', dislikes:'', mbti:'', ennegram: '', moralAlignment:''}}
       validate={values => {
         const errors = {};
         if (!values.name) {
           errors.name = 'Required';
         } else if (
           !/^[a-zA-Z\s.,\d]*$/i.test(values.name)
         ) {
           errors.name = 'Character name can only include letters, numbers, and spaces.';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {({ isSubmitting }) => (
         <Form> 
          <label htmlFor="Name">Name</label>
          <Field id="name" name="name" />
          <ErrorMessage name="name" component="div"/>

          <label htmlFor="Fandom">Fandom</label>
          <Field id="fandom" name="fandom" />
          <ErrorMessage name="fandom" component="div"/>

          <label htmlFor="desc">Description</label>
          <Field as="textarea" id="desc" name="desc" />
          <ErrorMessage name="desc" component="div"/>

          <h1> Optional</h1>
          <label htmlFor="">Label</label>
          <Field id="" name="" />
          <ErrorMessage name="" component="div"/> 

           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
   </div>
 );
 
 export default PostForm;

/*  Template.
<label htmlFor="">Label</label>
 <Field id="" name="" />
 <ErrorMessage name="" component="div"/> */