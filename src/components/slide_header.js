


function Slide_hearder() {
    return (

        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" style={{ width: '100%', right: '0px' }}>
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">

                    <img className="d-block w-100 myImg" src="https://nld.mediacdn.vn/291774122806476800/2021/10/18/anh-chup-man-hinh-2021-10-18-luc-42355-ch-1634554699315535282495.png" alt="First slide" />
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100 myImg" src="https://i1-dulich.vnecdn.net/2022/06/16/World-Travel-1-2359-1655367719.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=hXSrCG9JOjd-E825X6ajFg" alt="Second slide" />
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100 myImg" src="https://toquoc.mediacdn.vn/280518851207290880/2023/4/5/3333380841899454470574571287910598869949696n-1680712798929833722222.jpeg" alt="Third slide" />
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div>
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    );
}

export default Slide_hearder;