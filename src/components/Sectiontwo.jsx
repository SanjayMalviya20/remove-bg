"use-cleint"
import Image from 'next/image'

const Sectiontwo = () => {
  return (
    <>
<div className='flex flex-col mb-16 gap-10 justify-center items-center'>
  <h1 className='text-3xl   text-center '>Remove the background in seconds <br /> with our easy-to-use tool</h1>
  <figure className="diff      rounded-md lg:aspect-[2] aspect-1/1 w-[80%] md:w-[40%] lg:w-[40%] h-1/2" tabIndex={0}>
    <div className="diff-item-1" role="img">
      <Image alt='image' width={300} height={400}  className='bg-cover' src={"https://photokit.com/images/removebg_after.webp"} />
    </div>
    <div className="diff-item-2" role="img" tabIndex={0}>
      <Image width={300} height={400} className='bg-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjbTChTh_tS6Bk6KzO3mhsm2YgDg-pxa7imlYy_rzO9ZnWXj07LH3xbsq1IVJmgEzJOg0&usqp=CAU" alt="" />
    </div>
    <div className="diff-resizer"></div>
  </figure>
</div>

    </>
  )
}

export default Sectiontwo
