

function Footer() {
    return (
      
            <footer className='text-center text-lg-start text-white ' style={{ backgroundColor: 'rgb(28,35,49)' }}>
                <div style={{ backgroundColor: 'rgb(99,81,206)' }}>
                <div className='d-flex justify-content-between p-4 container' style={{ backgroundColor: 'rgb(99,81,206)' }}>
                    <div className='me-5'>
                        <span>
                            Get connected with us on social networks:
                        </span>
                    </div>

                    <div >
                        <a href='#' style={{margin:'10px'}} className='text-white me-4'><i class="fa-brands fa-facebook"></i></a>
                        <a href='#' style={{margin:'10px'}} className='text-white me-4'><i class="fa-brands fa-twitch"></i></a>
                        <a href='#' style={{margin:'10px'}} className='text-white me-4'><i class="fa-brands fa-google"></i></a>
                        <a href='#' style={{margin:'10px'}} className='text-white me-4'><i class="fa-brands fa-instagram"></i></a>
                        <a href='#' style={{margin:'10px'}} className='text-white me-4'><i class="fa-brands fa-github"></i></a>
                    </div>
                </div>
                </div>

                <div>
                    <div className='container text-center text-md-start mt-5'>
                        <div className='row mt-3'>
                            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
                                <div className='text-uppercase fw-bold'>Company name</div>
                                <hr className='mb-4 mt-0 d-inline-block mx-auto' style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                                <p>
                                    Here you can use rows and columns to organize your footer
                                    content. Lorem ipsum dolor sit amet, consectetur adipisicing
                                    elit.
                                </p>
                            </div>

                            <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold'>Products</h6>
                                <hr className='mb-4 mt-0 d-inline-block mx-auto' style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                                <p>
                                    <a href='#!' className='text-white'>a</a>
                                </p>
                                <p>
                                    <a href='#!' className='text-white'>a</a>
                                </p>
                                <p>
                                    <a href='#!' className='text-white'>a</a>
                                </p>
                                <p>
                                    <a href='#!' className='text-white'>a</a>
                                </p>

                            </div>
                            <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold'>Useful links</h6>
                                <hr className='mb-4 mt-0 d-inline-block mx-auto' style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                                <p>
                                    <a href='#!' className='text-white'>b</a>
                                </p>
                                <p>
                                    <a href='#!' className='text-white'>b</a>
                                </p>
                                <p>
                                    <a href='#!' className='text-white'>b</a>
                                </p>
                                <p>
                                    <a href='#!' className='text-white'>b</a>
                                </p>

                            </div> <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold'>Contact</h6>
                                <hr className='mb-4 mt-0 d-inline-block mx-auto' style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                                <p>
                                    <a href='#!' className='text-white'>c</a>
                                </p>
                                <p>
                                    <a href='#!' className='text-white'>c</a>
                                </p>
                                <p>
                                    <a href='#!' className='text-white'>c</a>
                                </p>
                                <p>
                                    <a href='#!' className='text-white'>c</a>
                                </p>

                            </div>


                        </div>
                    </div>
                </div>

            </footer>
     
    );
}

export default Footer;