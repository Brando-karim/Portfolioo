import type React from "react"
import { Mail, Github, Linkedin, Twitter } from "lucide-react"
import { BsStackOverflow } from "react-icons/bs"

const Footer: React.FC = () => {
  return (
    <footer className=" py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Contact Section */}
        <div className="text-center mb-12">
          
          
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Am always open to discussing new opportunities, interesting projects, or just having a chat about
            technology and development.
          </p>
          
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center items-center gap-6 mb-8">
          <a href="https://www.linkedin.com/in/karim-ben-jelloul-623765270/" target="_blank" rel="noopener noreferrer" className="group">
            <div className="w-12 h-12 bg-slate-800 dark:bg-slate-900 rounded-full flex items-center justify-center border border-slate-700 hover:border-violet-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-violet-600">
              <Linkedin size={20} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
            </div>
          </a>

          <a href="https://x.com/Elrik_Karim" target="_blank" rel="noopener noreferrer" className="group">
            <div className="w-12 h-12 bg-slate-800 dark:bg-slate-900 rounded-full flex items-center justify-center border border-slate-700 hover:border-violet-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-violet-600">
              <Twitter size={20} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
            </div>
          </a>

          <a href="https://github.com/Brando-karim" target="_blank" rel="noopener noreferrer" className="group">
            <div className="w-12 h-12 bg-slate-800 dark:bg-slate-900 rounded-full flex items-center justify-center border border-slate-700 hover:border-violet-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-violet-600">
              <Github size={20} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
            </div>
          </a>  

          <a href="https://stackoverflow.com/users/28795772/brando-karim" className="group">
            <div className="w-12 h-12 bg-slate-800 dark:bg-slate-900 rounded-full flex items-center justify-center border border-slate-700 hover:border-violet-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-violet-600">
              <BsStackOverflow size={20} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
            </div>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-slate-700">
          <p className="text-gray-400 text-sm">© 2025 Benjelloul Karim. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
