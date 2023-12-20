import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';

const Maintenence = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Maintenance'));
    });
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-t from-[#c39be3] to-[#f2eafa]">
            <div className="text-center p-5">
                <h2 className="text-3xl md:text-5xl mb-10 font-bold">Under Maintenance</h2>
                <h4 className="mb-5 font-semibold text-xl sm:text-2xl text-primary">Thank you for visiting us.</h4>
                <p className="text-base">
                    We are currently working on making some improvements <br className="sm:block hidden" />
                    to give you better user experience. <br /> <br />
                    Please visit us again shortly.
                </p>
                <Link to="/" className="btn btn-primary mt-5 w-max mx-auto">
                    Home
                </Link>
            </div>
        </div>
    );
};

export default Maintenence;
