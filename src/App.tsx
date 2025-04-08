import './App.css'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

interface FormData {
  name: string;
  email: string;
  message: string;
}

function App() {

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const onSubmitForm = (data: FormData) => {
    console.log("data", data)

    form.reset();
  }

  return (
    <>
      <div className='container'>
    
        <form className='form' onSubmit={form.handleSubmit(onSubmitForm)} noValidate>
          <label htmlFor="name">Name</label>
          <input className='input' type="text" placeholder='Enter your name' {...form.register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters long",
            },
          })}/>

          {form.formState.errors.name && <p className='error'>{form.formState.errors.name.message}</p>}

          <label htmlFor="email">Email</label>
          <input className=' input' type="email" placeholder='Enter your email' {...form.register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}/>

          {form.formState.errors.email && <p className='error'>{form.formState.errors.email.message}</p>}
 
          <label htmlFor="message">Message</label>
          <textarea rows={5} className='input' placeholder='Enter your message' {...form.register("message", {
            required: "Message is required",
            minLength: {
              value: 10,
              message: "Message must be at least 10 characters long",
            },
          })}/>

          {form.formState.errors.message && <p className='error'>{form.formState.errors.message.message}</p>}

          <button className={`btn ${!form.formState.isValid ? 'btn-disabled' : ''}`} type="submit">Submit</button>
        </form>
        <DevTool control={form.control} />
      </div>
    </>
  )
}

export default App
