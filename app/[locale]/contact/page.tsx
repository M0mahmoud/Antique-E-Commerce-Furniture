import ContactForm from "./ContactForm";

const ContactPage = () => {
  return (
    <section className="contactus" id="contactus">
      <div className="container mx-auto">
        <div className="mx-auto max-w-lg w-full py-8 text-center">
          <h2 className="capitalize">Looking for support?</h2>
          <p className="mb-8">
            We might already have what you’re looking for. See our FAQs or head
            to our dedicated Help Center.
          </p>
        </div>
        <div className="">
          <ContactForm />
          <div className="flex flex-wrap gap-4 mb-5 pb-4 justify-start sm:justify-between max-w-2xl mx-auto sm:flex-row flex-col items-start">
            <div className="mb-3 w-full sm:w-auto">
              <div className="flex sm:items-center justify-center gap-2 flex-col sm:flex-row w-full">
                <div className="rounded-md h-12 w-12 leading-normal bg-secondary text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="block w-6 h-full m-auto fill-primary bi bi-envelope-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                  </svg>
                </div>
                <div className="service-contents">
                  <a href="mailto:contact@devmahmoud.me">
                    contact@devmahmoud.me
                  </a>
                </div>
              </div>
            </div>
            <div className="mb-3 w-full sm:w-auto">
              <div className="flex sm:items-center justify-center gap-2 flex-col sm:flex-row w-full">
                <div className="rounded-md h-12 w-12 leading-normal bg-secondary text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="block w-6 h-full m-auto fill-primary bi bi-geo-alt-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>
                </div>
                <div className="service-contents">
                  <span>Sharqia, Egypt 3250</span>
                </div>
              </div>
            </div>
            <div className="mb-3 w-full sm:w-auto">
              <div className="flex sm:items-center justify-center gap-2 flex-col sm:flex-row w-full">
                <div className="rounded-md h-12 w-12 leading-normal bg-secondary text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="block w-6 h-full m-auto fill-primary bi bi-telephone-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                    />
                  </svg>
                </div>
                <div className="service-contents">
                  <a href="tel:+20 115 683 2943">+20 115 683 2943</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
