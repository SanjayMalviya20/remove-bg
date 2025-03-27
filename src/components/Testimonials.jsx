// Testimonials.js
const Testimonials = () => {
    const testimonials = [
      {
        image: 'https://picsum.photos/200/300?random=1',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.',
        name: 'Ajay Sharma',
        position: 'CEO, ABC Corporation'
      },
      {
        image: 'https://picsum.photos/200/300?random=2',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.',
        name: 'Sahil Jain',
        position: 'Marketing Manager, DEF Inc.'
      },
      {
        image: 'https://picsum.photos/200/300?random=3',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.',
        name: 'Rahul Agarwal',
        position: 'Software Engineer, GHI Ltd.'
      }
    ];
  
    return (
      <div className="container mx-auto p-3 pt-6">
        <h1 className="text-3xl  mb-4 text-center">Customers Testimonials</h1>
        <div className="flex flex-wrap justify-center  gap-4">
          {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-100 rounded-lg shadow-md p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                <h1 className="text-black text-3xl">”</h1>
              <p className="text-gray-600 mt-4">{testimonial.text}</p>
              <div className="flex items-center gap-3">
              <img src={testimonial.image} alt={testimonial.name} className="w-[40px] h-[40px] object-cover rounded-full" />

           <div>
           <h4 className="font-bold text-lg mt-2">{testimonial.name}</h4>
           <p className="text-gray-500 text-sm">{testimonial.position}</p>
           </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Testimonials;