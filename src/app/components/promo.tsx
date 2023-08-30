import Image from 'next/image'


export default function Promo() {

    return(
        <div className="px-72 py-20">
            <Image src="/celtic-logo-vector.png" width={100} height={100} alt="middle-seperator" className='mx-auto relative bottom-32'/>
            <div className='flex justify-between text-center'>
                <div className='w-60'>
                    <Image src="/check.png" width={50} height={50} alt="check-icon" className='m-auto mb-5'/>
                    <h1 className='mb-2'>Authentic</h1>
                    <p>All shirts are authentic and fake checked</p>
                </div>
                <div className='w-60'>
                    <Image src="/check.png" width={50} height={50} alt="check-icon" className='m-auto mb-5'/>
                    <h1 className='mb-2'>Quality</h1>
                    <p>Premium quality collection spanning decades</p>
                </div>
                <div className='w-60'>
                    <Image src="/check.png" width={50} height={50} alt="check-icon" className='m-auto mb-5'/>
                    <h1 className='mb-2'>Verified</h1>
                    All shirts are verified to be worn by players
                </div>
            </div>
        </div>
    )
}