import ContactUs from '../../components/contact-us/ContactUs';
import { ISubmitResult, IValues } from '../../components/form/Form';
import PageContainer from '../../components/page-container/PageContainer';

const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const ContactUsPage = () => {
  const handleSubmit = async (values: IValues): Promise<ISubmitResult> => {
    await wait(1000); // simulate asynchronous web API call
    // return {
    //   errors: {
    //     email: ["Some is wrong with this"],
    //   },
    //   success: false,
    // };
    return {
      success: true,
    };
  };
  return (
    <PageContainer>
      <h1>Contact Us</h1>
      <p>If you enter your details we'll get back to you as soon as we can.</p>
      <ContactUs onSubmit={handleSubmit} />
    </PageContainer>
  );
};

export default ContactUsPage;
