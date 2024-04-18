import React, { useRef, useEffect, useState } from 'react'
import {
    Flex,
    Button,
    Input,
    Text,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Box,
    Slider,
    SliderMark,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Tooltip,
    Stack,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Tag,
    Radio,
    RadioGroup,
    VStack,
} from '@chakra-ui/react'
import { MdGraphicEq } from 'react-icons/md'
import { GiAxeInLog } from 'react-icons/gi'
import {
    dynamicNonLinearGain,
    physicalAngleStepBasedGain,
    virtualAngleStepBasedGain,
    velocityGuidedGain,
} from '../scripts/gain-techniques'

export enum TechniquesEnum {
    Constant = 'constant',
    ConstantIndirectMap = 'indirect-constant',
    VelocityGuided = 'velocity',
    DynamicNonLinear = 'dynamic',
    physicalAngleStepBasedGain = 'physical-angle-step-based',
    virtualAngleStepBasedGain = 'virtual-angle-step-based',
}

const RotationGains: React.FC = () => {
    // Dynamic Gain Default values and states
    const defaultMinGain = 1
    const defaultMaxGain = 2.5
    const defaultHalfRotation = 90
    const defaultTargetRotation = 180
    const [minGain, setMinGain] = useState(defaultMinGain)
    const [maxGain, setMaxGain] = useState(defaultMaxGain)
    const [halfRotation, setHalfRotation] = useState(defaultHalfRotation)
    const [targetRotation, setTargetRotation] = useState(defaultTargetRotation)

    // Default values for each step
    const defaultValues = {
        step1: 1.8,
        step2: 2.2,
        step3: 2.5,
        step4: 2.8,
        step5: 2.5,
        step6: 2,
        step7: 1.8,
    }

    // States for each step
    const [step1, setStep1] = useState(defaultValues.step1)
    const [step2, setStep2] = useState(defaultValues.step2)
    const [step3, setStep3] = useState(defaultValues.step3)
    const [step4, setStep4] = useState(defaultValues.step4)
    const [step5, setStep5] = useState(defaultValues.step5)
    const [step6, setStep6] = useState(defaultValues.step6)
    const [step7, setStep7] = useState(defaultValues.step7)

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
    }

    const [showTooltip, setShowTooltip] = React.useState(false)
    const [showTooltipVel, setShowTooltipVel] = React.useState(false)
    const [inputPhysicalAngle, setInputPhysicalAngle] = useState(0) // Initial angle for the main point
    const [amplifiedVirtualAngle, setAmplifiedVirtualAngle] = useState(0)
    // const [accuAngle, setAccuAmplifiedAngle] = useState(0)
    const [step, setStep] = useState(0.5)
    const [gain, setGain] = useState(0)
    const [velocity, setVelocity] = useState(25)
    const [points, setPoints] = useState<
        {
            angle: number
            color: string
            label: string
            gain: number
            inputAngle: number
            velocity: number
            technique: string
        }[]
    >([]) // Array to store angles, colors, and labels of points
    const [technique, setTechnique] = useState<TechniquesEnum>(TechniquesEnum.Constant)

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')

            if (ctx) {
                // Clear canvas before drawing
                ctx.clearRect(0, 0, canvas.width, canvas.height)

                // Center of the canvas
                const centerX = canvas.width / 2
                const centerY = canvas.height / 2
                const radius = 150 // Larger Radius of the circle
                const lineWidth = 4 // Thicker line width

                // Draw the circle with a thicker line
                ctx.beginPath()
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
                ctx.lineWidth = lineWidth
                ctx.stroke()

                // Draw points at specific angles
                drawMainPoint(
                    ctx,
                    centerX,
                    centerY,
                    amplifiedVirtualAngle,
                    '#B00020',
                    lineWidth * 2
                ) // Main point
                points.forEach((point) => {
                    if (point.angle !== amplifiedVirtualAngle) {
                        drawPoint(ctx, centerX, centerY, point.angle, point.color, lineWidth) // Other points
                        drawLabel(ctx, centerX, centerY, point.angle, point.label) // Label for new points
                    }
                })
            }
        }
    }, [amplifiedVirtualAngle, points])

    // Function to draw the main point at a specific angle
    const drawMainPoint = (
        ctx: CanvasRenderingContext2D,
        centerX: number,
        centerY: number,
        angle: number,
        color: string,
        pointSize: number
    ) => {
        const radians = angle * (Math.PI / 180)
        const radius = 150 // Larger Radius of the circle
        const x = centerX + radius * Math.cos(radians)
        const y = centerY + radius * Math.sin(radians)
        ctx.beginPath()
        ctx.arc(x, y, pointSize, 0, 2 * Math.PI) // Make main point larger
        ctx.fillStyle = color
        ctx.fill()

        // Label the angle
        const labelX = x + (angle === 180 ? -15 : 10) // Adjust label position for 180 angle
        const labelY = y - 10 // Adjust label position vertically
        ctx.fillStyle = '#007bff' // Change label color to blue
        ctx.font = 'bold 16px Arial' // Increase font size and make it bold for labels
        ctx.fillText(angle.toString(), labelX, labelY)
    }

    // Function to draw a point at a specific angle
    const drawPoint = (
        ctx: CanvasRenderingContext2D,
        centerX: number,
        centerY: number,
        angle: number,
        color: string,
        lineWidth: number
    ) => {
        const radians = angle * (Math.PI / 180)
        const radius = 150 // Larger Radius of the circle
        const x = centerX + radius * Math.cos(radians)
        const y = centerY + radius * Math.sin(radians)
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, 2 * Math.PI) // Make points larger
        ctx.fillStyle = color
        ctx.fill()
    }

    // Function to draw a label for a new point
    const drawLabel = (
        ctx: CanvasRenderingContext2D,
        centerX: number,
        centerY: number,
        angle: number,
        label: string
    ) => {
        const radians = angle * (Math.PI / 180)
        const radius = 150 // Larger Radius of the circle
        const labelDistance = 20 // Distance of label from the point
        const x = centerX + (radius + labelDistance) * Math.cos(radians)
        const y = centerY + (radius + labelDistance) * Math.sin(radians)
        ctx.fillStyle = 'black'
        ctx.font = '12px Arial' // Font size for labels
        ctx.fillText(label, x, y)
    }

    // Function to generate a random color
    const getRandomColor = () => {
        const colors = [
            '#a17ff5',
            '#ff9966',
            '#80ffbf',
            '#ff99cc',
            '#66b3ff',
            '#ffb380',
            '#80dfff',
            '#ff80b3',
            '#99ff66',
            '#ffcc66',
        ]
        return colors[Math.floor(Math.random() * colors.length)]
    }

    const handleMainPointAngleChange = (val) => {
        let new_gain = gain

        switch (technique) {
            case TechniquesEnum.VelocityGuided:
                new_gain = velocityGuidedGain(velocity)
                break

            case TechniquesEnum.DynamicNonLinear:
                new_gain = dynamicNonLinearGain(
                    amplifiedVirtualAngle,
                    minGain,
                    maxGain,
                    halfRotation
                )
                break

            case TechniquesEnum.physicalAngleStepBasedGain:
                new_gain = physicalAngleStepBasedGain(val, [
                    step1,
                    step2,
                    step3,
                    step4,
                    step5,
                    step6,
                    step7,
                ])
                break
            case TechniquesEnum.virtualAngleStepBasedGain:
                new_gain = virtualAngleStepBasedGain(amplifiedVirtualAngle, [
                    step1,
                    step2,
                    step3,
                    step4,
                    step5,
                    step6,
                    step7,
                ])
                break
            // default:
            //     new_gain = gain
        }

        const newAmplifiedNumber = parseFloat((parseFloat(val) * new_gain).toFixed(3))

        // console.log('val:', val)
        // console.log('mainPointAngle:', mainPointAngle)
        // console.log('new_gain:', new_gain)
        // console.log('gain:', gain)
        // console.log('amplifiedAngle:', amplifiedAngle)
        // console.log('val > mainPointAngle:', val > mainPointAngle)

        if (technique === TechniquesEnum.Constant) {
            setAmplifiedVirtualAngle(Number(newAmplifiedNumber))
        } else {
            if (val > inputPhysicalAngle) {
                //rotate
                setAmplifiedVirtualAngle((lastAngle) =>
                    parseFloat(((val - inputPhysicalAngle) * new_gain + lastAngle).toFixed(3))
                )
            } else {
                //prev rotate
                setAmplifiedVirtualAngle((lastAngle) =>
                    //previous gain should be used to calculate virtual angle
                    parseFloat(((val - inputPhysicalAngle) * gain + lastAngle).toFixed(3))
                )
            }
            setGain(Number(new_gain))
        }

        setInputPhysicalAngle(parseFloat(val))
    }

    // Function to handle adding more points
    const handleAddPoint = () => {
        setPoints((prevPoints) => {
            const newAngle = amplifiedVirtualAngle
            const newColor = getRandomColor()
            const newLabel = `${amplifiedVirtualAngle}°`
            const newPoints = [
                ...prevPoints,
                {
                    angle: newAngle,
                    color: newColor,
                    label: newLabel,
                    gain: gain,
                    inputAngle: inputPhysicalAngle,
                    technique: technique,
                    velocity: velocity,
                },
            ]
            return newPoints.sort((a, b) => a.angle - b.angle) // Sort points by angle
        })
    }

    // Function to handle resetting points
    const handleResetPoints = () => {
        setPoints([])
        // setPoints([{ angle: 180, color: '#B00020', label: '180°' }])
    }

    const handleVelocityChange = (v: number): void => {
        const new_gain = velocityGuidedGain(v)
        setGain(Number(new_gain.toFixed(2)))
        setVelocity(v)
    }

    const handleTechniquesChange = (value: string) => {
        setTechnique(value as TechniquesEnum)
    }

    const handleGainInputChange = (event) => {
        setGain(Number(event.target.value ?? 0))
    }

    const handleStepInputChange = (event) => {
        setStep(Number(event.target.value ?? 0))
    }

    return (
        <>
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
            <Box position="fixed" top="0" right="0">
                <RadioGroup onChange={handleTechniquesChange} value={technique}>
                    <Stack>
                        <Box
                            backgroundColor="#f0f0f0"
                            padding="20px"
                            boxShadow="0 2px 5px rgba(0, 0, 0, 0.2)"
                        >
                            <Stack direction="column">
                                <Stack isInline>
                                    <Radio value={TechniquesEnum.Constant}>Constant</Radio>
                                    <Input
                                        type="number"
                                        size="sm"
                                        variant="outline"
                                        placeholder="Enter Gain..."
                                        width="120px"
                                        value={gain}
                                        onChange={handleGainInputChange}
                                    />
                                </Stack>
                                <Stack isInline>
                                    <Radio value={TechniquesEnum.ConstantIndirectMap}>
                                        Indirect Map Constant
                                    </Radio>
                                </Stack>
                            </Stack>
                        </Box>
                        <Box
                            backgroundColor="#f0f0f0"
                            padding="20px"
                            boxShadow="0 2px 5px rgba(0, 0, 0, 0.2)"
                        >
                            <Stack>
                                <Radio value={TechniquesEnum.VelocityGuided}>Velocity Guided</Radio>
                            </Stack>
                        </Box>
                        <Box
                            backgroundColor="#f0f0f0"
                            padding="20px"
                            boxShadow="0 2px 5px rgba(0, 0, 0, 0.2)"
                        >
                            <Stack>
                                <Radio value={TechniquesEnum.DynamicNonLinear}>
                                    Dynamic Non-Linear
                                </Radio>
                                <Box>
                                    <VStack spacing={4}>
                                        <Stack isInline>
                                            <Text>Min Gain:</Text>
                                            <Input
                                                type="number"
                                                value={minGain}
                                                onChange={(e) =>
                                                    setMinGain(parseFloat(e.target.value))
                                                }
                                                width="120px"
                                                size="sm"
                                            />
                                        </Stack>
                                        <Stack isInline>
                                            <Text>Max Gain:</Text>
                                            <Input
                                                type="number"
                                                value={maxGain}
                                                onChange={(e) =>
                                                    setMaxGain(parseFloat(e.target.value))
                                                }
                                                width="120px"
                                                size="sm"
                                            />
                                        </Stack>
                                        <Stack isInline>
                                            <Text>Half Rotation:</Text>
                                            <Input
                                                type="number"
                                                value={halfRotation}
                                                onChange={(e) =>
                                                    setHalfRotation(parseFloat(e.target.value))
                                                }
                                                width="120px"
                                                size="sm"
                                            />
                                        </Stack>
                                        <Stack isInline>
                                            <Text>Target Rotation:</Text>
                                            <Input
                                                type="number"
                                                value={targetRotation}
                                                onChange={(e) =>
                                                    setTargetRotation(parseFloat(e.target.value))
                                                }
                                                width="120px"
                                                size="sm"
                                            />
                                        </Stack>
                                    </VStack>
                                </Box>
                            </Stack>
                        </Box>
                        <Box
                            backgroundColor="#f0f0f0"
                            padding="20px"
                            boxShadow="0 2px 5px rgba(0, 0, 0, 0.2)"
                        >
                            <Stack>
                                <Radio value={TechniquesEnum.physicalAngleStepBasedGain}>
                                    Physical Angle Step Based
                                </Radio>
                                <Radio value={TechniquesEnum.virtualAngleStepBasedGain}>
                                    Virtual Angle Step Based
                                </Radio>
                                <Box>
                                    <Stack spacing={4}>
                                        <Stack isInline>
                                            <Text fontWeight="bold">Step1:</Text>
                                            <Input
                                                size="sm"
                                                value={step1}
                                                onChange={(e) =>
                                                    setStep1(parseFloat(e.target.value))
                                                }
                                                placeholder="Step 1"
                                            />
                                        </Stack>
                                        <Stack isInline>
                                            <Text fontWeight="bold">Step2:</Text>
                                            <Input
                                                size="sm"
                                                value={step2}
                                                onChange={(e) =>
                                                    setStep2(parseFloat(e.target.value))
                                                }
                                                placeholder="Step 2"
                                            />
                                        </Stack>
                                        <Stack isInline>
                                            <Text fontWeight="bold">Step3:</Text>
                                            <Input
                                                size="sm"
                                                value={step3}
                                                onChange={(e) =>
                                                    setStep3(parseFloat(e.target.value))
                                                }
                                                placeholder="Step 3"
                                            />
                                        </Stack>
                                        <Stack isInline>
                                            <Text fontWeight="bold">Step4:</Text>
                                            <Input
                                                size="sm"
                                                value={step4}
                                                onChange={(e) =>
                                                    setStep4(parseFloat(e.target.value))
                                                }
                                                placeholder="Step 4"
                                            />
                                        </Stack>
                                        <Stack isInline>
                                            <Text fontWeight="bold">Step5:</Text>
                                            <Input
                                                size="sm"
                                                value={step5}
                                                onChange={(e) =>
                                                    setStep5(parseFloat(e.target.value))
                                                }
                                                placeholder="Step 5"
                                            />
                                        </Stack>
                                        <Stack isInline>
                                            <Text fontWeight="bold">Step6:</Text>
                                            <Input
                                                size="sm"
                                                value={step6}
                                                onChange={(e) =>
                                                    setStep6(parseFloat(e.target.value))
                                                }
                                                placeholder="Step 6"
                                            />
                                        </Stack>
                                        <Stack isInline>
                                            <Text fontWeight="bold">Step7:</Text>
                                            <Input
                                                size="sm"
                                                value={step7}
                                                onChange={(e) =>
                                                    setStep7(parseFloat(e.target.value))
                                                }
                                                placeholder="Step 7"
                                            />
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Box>
                    </Stack>
                </RadioGroup>
            </Box>

            <Flex direction="column" alignItems="center" justifyContent="center">
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={400}
                    style={{ border: '1px solid black', marginBottom: '10px' }}
                ></canvas>
                {/* Increase canvas size */}
                <Flex alignItems="center" marginBottom="5px">
                    {/* <Input
                    type="range"
                    min={0}
                    max={360}
                    value={mainPointAngle}
                    onChange={handleMainPointAngleChange}
                /> */}
                </Flex>
                <Stack isInline>
                    <Button colorScheme="blue" onClick={handleAddPoint} marginRight="10px">
                        Add Point
                    </Button>
                    <Button colorScheme="red" onClick={handleResetPoints}>
                        Reset Points
                    </Button>
                </Stack>
            </Flex>
            <Stack spacing="8">
                <Stack>
                    <Heading size="md">Angle</Heading>
                    <Box p={4} pt={6}>
                        <Slider
                            id="slider"
                            defaultValue={0}
                            min={0}
                            max={180}
                            step={step}
                            colorScheme="teal"
                            onChange={(v) => handleMainPointAngleChange(v)}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                        >
                            <SliderMark value={30} mt="1" ml="-2.5" fontSize="sm">
                                30°
                            </SliderMark>
                            <SliderMark value={62.5} mt="1" ml="-2.5" fontSize="sm">
                                62.5°
                            </SliderMark>
                            <SliderMark value={90} mt="1" ml="-2.5" fontSize="sm">
                                90°
                            </SliderMark>
                            <SliderMark value={120} mt="1" ml="-2.5" fontSize="sm">
                                120°
                            </SliderMark>
                            <SliderMark value={180} mt="1" ml="-2.5" fontSize="sm">
                                180°
                            </SliderMark>

                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <Tooltip
                                hasArrow
                                bg="teal.500"
                                color="white"
                                placement="top"
                                isOpen={showTooltip}
                                label={`${inputPhysicalAngle}°`}
                            >
                                <SliderThumb boxSize={6}>
                                    <Box color="teal" as={MdGraphicEq} />
                                </SliderThumb>
                            </Tooltip>
                        </Slider>
                    </Box>
                </Stack>
                <Stack>
                    <Heading size="md">Velocity</Heading>
                    <Box p={4} pt={6}>
                        <Slider
                            id="slider"
                            defaultValue={0}
                            min={0}
                            max={70}
                            colorScheme="teal"
                            onChange={(v) => handleVelocityChange(v)}
                            onMouseEnter={() => setShowTooltipVel(true)}
                            onMouseLeave={() => setShowTooltipVel(false)}
                        >
                            <SliderMark value={10} mt="1" ml="-2.5" fontSize="sm">
                                10
                            </SliderMark>
                            <SliderMark value={26.7} mt="1" ml="-2.5" fontSize="sm">
                                26.7
                            </SliderMark>
                            <SliderMark value={41.1} mt="1" ml="-2.5" fontSize="sm">
                                41.1
                            </SliderMark>
                            <SliderMark value={62.2} mt="1" ml="-2.5" fontSize="sm">
                                62.2
                            </SliderMark>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <Tooltip
                                hasArrow
                                bg="teal.500"
                                color="white"
                                placement="top"
                                isOpen={showTooltipVel}
                                label={`${velocity}°`}
                            >
                                <SliderThumb boxSize={6}>
                                    <Box color="teal" as={MdGraphicEq} />
                                </SliderThumb>
                            </Tooltip>
                        </Slider>
                    </Box>
                </Stack>
                <Table colorScheme="linkedin" variant="striped">
                    <Thead>
                        <Tr>
                            <Th>Color</Th>
                            <Th>Angle</Th>
                            <Th>Gain</Th>
                            <Th>Amplified Angle</Th>
                            <Th>Velocity</Th>
                            <Th>Technique</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {points.map((row, index) => (
                            <Tr key={index}>
                                <Td>
                                    <Tag bgColor={row.color}></Tag>
                                </Td>
                                <Td>{row.inputAngle}</Td>
                                <Td>{row.gain}</Td>
                                <Td>{row.label}</Td>
                                <Td>{row.velocity}</Td>
                                <Td>{row.technique}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Stack>
        </>
    )
}

export default RotationGains

// const gMax= 3
// const rVirtual=90
// const rHalf=90
// const rTarget=180

// const res =  gMin * Math.abs(((rVirtual-rHalf)/rHalf)) + gMax * (1-Math.abs(((rVirtual-rHalf)/rHalf)))
// console.log(res)

// const minGain= 1
// const maxGain= 3
// const halfRotation=90
// const targetRotation=180
