import { Button, Spinner } from 'react-bootstrap';

interface FormButtonProps {
    isSubmitting: boolean,
    buttonText: string
    expand?: boolean
}

// TODO: consider merging this with the FormButton!

const FormButton = ({ isSubmitting, buttonText, expand=true }: FormButtonProps) => {
  return (
    <Button variant="primary" type="submit" disabled={isSubmitting} style={expand? { width: '100%' } : {}}>
      {isSubmitting ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
};

export default FormButton
