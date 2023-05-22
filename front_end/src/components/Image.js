import { Image } from 'antd'
const IImage = ({ index }) => {
    return (
        <Image
            height={300}
            src={`/Introduction/${index}.jpg`}
            style={{ border: '2px solid #000', borderRadius: '10px' }}
        />)
}
export default IImage