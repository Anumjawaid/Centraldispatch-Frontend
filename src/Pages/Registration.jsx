import MultiColumnTemplate from "../Components/Template/MultiColumnTemplate";
import shipperImg from "../Components/Assets/fullshipper.jpg"
import {RegistrationForm} from "../Components/Athentication/Registration";

const RegistrationPage = () => {
   
  return (
    <MultiColumnTemplate
      imageSrc={shipperImg}
      heading="Registration"
      subheading="Please Register here"
      rightComponent={<RegistrationForm />}
      extraInfo={"Free Registration For 3 Months, After Which A One-Time Fee Of $100 Applies."}
    />
  );
};

export default RegistrationPage;
