import "./newHotel.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"
import { useState } from "react"
import { hotelInputs } from "../../formSource"
import useFetch from "../../hooks/useFetch"
import axios from "axios"

const NewHotel = () => {
    const [files, setFiles] = useState("")
    const [info, setInfo] = useState({})
    const [rooms, setRooms] = useState([])
    const { data, loading, error } = useFetch("/rooms")

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleSelect = (e) => {
        const value = Array.from(e.target.selectedOptions, (option) => option.value)
        setRooms(value)
    }

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            const list = await Promise.all(
                Object.values(files).map(async (file) => {
                    const data = new FormData()
                    data.append("file", file)
                    data.append("upload_preset", "upload")
                    const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dpkp8ha7b/image/upload", data)
                    const { url } = uploadRes.data
                    return url
                })
            )
            const newHotel = {
                ...info,
                rooms,
                photos: list,
            }
            await axios.post("/hotels", newHotel)
        }
        catch (error) {
            console.log(error)
        }
        console.log(files)
    }

    return (
        <div className="new">
            <Sidebar />
            <div className="top">
                <h1>Add New Room</h1>
            </div>
            <div className="bottom">
                <div className="right">
                    <form>
                        {roomInputs.map((input) => (
                            <div className="formInput" key={input.id}>
                                <label>
                                    {input.label}
                                </label>
                                <input id={input.id} type={input.type}
                                placeholder={input.placeholder} onChange={handleChange} />
                            </div>
                        ))}
                        <div className="formInput">
                            <label htmlFor="">
                                Rooms
                            </label> 
                            <textarea onChange={(e) => setRooms(e.target.value)} placeholder='Give Comma between room number.'></textarea>   
                        </div>
                        <div className="formInput">
                            <label>Choose a Hotel</label>
                            <select id="hotelId" onChange={(e) => setHotelId(e.target.value)}>
                                {
                                    loading ? "loading" : data && data.map((hotel) => (
                                        <option key={hotel.id} value={hotel._id}>
                                            {hotel.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <button onClick={handleClick}>Send</button>                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewRoom;
