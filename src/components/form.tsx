import { useForm, SubmitHandler } from "react-hook-form";

interface Input {
  label: string;
  type: string;
  error?: string | JSX.Element;
}

interface FormProps {
  inputs: Input[];
  onSubmit: SubmitHandler<any>;
  buttonText: string;
  isLoading: boolean;
}

const Form: React.FC<FormProps> = ({ inputs, onSubmit, buttonText, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    reset(); // Reinicia el formulario después de enviarlo
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {inputs.map((input, index) => {
        return (
          <div className="my-10" key={`input-${index}`}>
            <label htmlFor={input.label} className="block mb-2 text-lg text-white font-bold">
              {input.label}
            </label>
            <input
              id={input.label}
              type={input.type}
              className="bg-transparent border-b-2 border-green-500 text-white font-bold text-sm block w-full outline-none"
              {...register(input.label, { required: true })}
            />
            {errors[input.label] && <span>{input.error}</span>}
          </div>
        );
      })}
      <div className="flex justify-center mt-20">
        <button
          type="submit"
          className={`text-white bg-green-500 ${isLoading ? "opacity-50" : ""} rounded-lg p-3 ml-1 text-sm lg:text-lg font-bold flex items-center`}
          disabled={isLoading}
        >
          {/* {isLoading && <Spinner />} */}
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default Form;
