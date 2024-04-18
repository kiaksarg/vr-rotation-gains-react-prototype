import { Input } from '@chakra-ui/input'
import { Box, Stack, Text } from '@chakra-ui/layout'
import { Tag } from '@chakra-ui/tag'

const LeftInfoBox = ({
    gain,
    inputPhysicalAngle,
    amplifiedVirtualAngle,
    step,
    handleStepInputChange,
}) => {
    return (
        <Box
            position="fixed"
            top="5px"
            left="5px"
            backgroundColor="#f0f0f0"
            padding="20px"
            boxShadow="0 2px 5px rgba(0, 0, 0, 0.2)"
            minW="300px"
        >
            <Stack>
                <Stack isInline>
                    <Text fontWeight="bold">Gain:</Text>
                    <Tag colorScheme="purple">{gain}</Tag>
                </Stack>
                <Stack isInline>
                    <Text fontWeight="bold">Input Angle:</Text>
                    <Tag colorScheme="purple">{inputPhysicalAngle}</Tag>
                </Stack>
                <Stack isInline>
                    <Text fontWeight="bold">Amplified Angle:</Text>
                    <Tag colorScheme="purple">{amplifiedVirtualAngle}</Tag>
                </Stack>
                <Stack isInline>
                    <Text fontWeight="bold">Angle Slider Step:</Text>
                    <Input
                        type="number"
                        size="sm"
                        variant="outline"
                        placeholder="Enter Gain..."
                        width="120px"
                        value={step}
                        onChange={handleStepInputChange}
                    />
                </Stack>
            </Stack>
        </Box>
    )
}

export default LeftInfoBox
