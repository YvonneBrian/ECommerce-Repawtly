import React from 'react';
import { PawPrint, Heart } from 'lucide-react';

const Foot = () => (
    <footer className="bg-gray-800 text-white p-8 mt-12">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
                <PawPrint className="w-6 h-6 text-amber-400" />
                <span className="text-xl font-bold">Repawtly</span>
            </div>
            <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Repawtly. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 flex items-center">
                Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> for pets.
            </p>
        </div>
    </footer>
);

export default Foot;
