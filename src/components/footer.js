

function Footer() {
    return (
      
            <footer className='text-center text-lg-start text-white' style={{ backgroundColor: 'rgb(28,35,49)', position:"fixed", bottom: '0', width: '100%' }}>
                <div style={{ backgroundColor: 'rgb(99,81,206)' }}>
                <div className='d-flex justify-content-between p-4 container' style={{ backgroundColor: 'rgb(99,81,206)' }}>
                    <div className='me-5'>
                        <span>
                            Get connected with us on social networks:
                        </span>
                    </div>

                    <div >
                        <a href='#' style={{ margin: '10px' }} className='text-white me-4'><i class="fa-brands fa-facebook"></i></a>
                        <a href='#' style={{ margin: '10px' }} className='text-white me-4'><i class="fa-brands fa-twitch"></i></a>
                        <a href='#' style={{ margin: '10px' }} className='text-white me-4'><i class="fa-brands fa-google"></i></a>
                        <a href='#' style={{ margin: '10px' }} className='text-white me-4'><i class="fa-brands fa-instagram"></i></a>
                        <a href='#' style={{ margin: '10px' }} className='text-white me-4'><i class="fa-brands fa-github"></i></a>
                    </div>
                </div>
            </div>

        </footer>

    );
}

export default Footer;