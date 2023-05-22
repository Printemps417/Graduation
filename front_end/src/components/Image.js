import { Image } from 'antd'
const IImage = ({ index, height }) => {
    return height ? (
        <Image
            height={height}
            src={`/Introduction/${index}.jpg`}
            style={{ border: '2px solid #000', borderRadius: '10px' }}
        />) : (
        <Image
            height={300}
            src={`/Introduction/${index}.jpg`}
            style={{ border: '2px solid #000', borderRadius: '10px' }}
        />)
}
export default IImage