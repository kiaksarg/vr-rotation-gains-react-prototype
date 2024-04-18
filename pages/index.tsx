import { Box } from '@chakra-ui/layout'
import { FC } from 'react'
import RotationGains from '../components/RotationGains'
const IndexPage: FC = () => {
    // Tick the time every second

    return (
        <Box my={10}>
            <RotationGains />
        </Box>
    )
}

export default IndexPage
