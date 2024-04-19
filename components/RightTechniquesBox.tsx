import React, { useState } from 'react'
import {
    Box,
    Stack,
    Radio,
    RadioGroup,
    Input,
    Text,
    VStack,
    Tooltip,
    Button,
    Center,
} from '@chakra-ui/react'
import { TechniquesEnum } from './RotationGains'

const RightTechniquesBox = ({
    handleTechniquesChange,
    technique,
    gain,
    handleGainInputChange,
    minGain,
    setMinGain,
    maxGain,
    setMaxGain,
    halfRotation,
    setHalfRotation,
    targetRotation,
    setTargetRotation,
    step1,
    setStep1,
    step2,
    setStep2,
    step3,
    setStep3,
    step4,
    setStep4,
    step5,
    setStep5,
    step6,
    setStep6,
    step7,
    setStep7,
    handleSetReturnGain,
}) => {

    return (
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
                            <Center>
                                <Tooltip label="Virtual Angle / Physical Angle">
                                    <Button
                                        onClick={handleSetReturnGain}
                                        mt="4"
                                        size="sm"
                                        colorScheme="facebook"
                                    >
                                        Set Return Gain
                                    </Button>
                                </Tooltip>
                            </Center>
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
                                            onChange={(e) => setMinGain(parseFloat(e.target.value))}
                                            width="120px"
                                            size="sm"
                                        />
                                    </Stack>
                                    <Stack isInline>
                                        <Text>Max Gain:</Text>
                                        <Input
                                            type="number"
                                            value={maxGain}
                                            onChange={(e) => setMaxGain(parseFloat(e.target.value))}
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
                                            onChange={(e) => setStep1(parseFloat(e.target.value))}
                                            placeholder="Step 1"
                                        />
                                    </Stack>
                                    <Stack isInline>
                                        <Text fontWeight="bold">Step2:</Text>
                                        <Input
                                            size="sm"
                                            value={step2}
                                            onChange={(e) => setStep2(parseFloat(e.target.value))}
                                            placeholder="Step 2"
                                        />
                                    </Stack>
                                    <Stack isInline>
                                        <Text fontWeight="bold">Step3:</Text>
                                        <Input
                                            size="sm"
                                            value={step3}
                                            onChange={(e) => setStep3(parseFloat(e.target.value))}
                                            placeholder="Step 3"
                                        />
                                    </Stack>
                                    <Stack isInline>
                                        <Text fontWeight="bold">Step4:</Text>
                                        <Input
                                            size="sm"
                                            value={step4}
                                            onChange={(e) => setStep4(parseFloat(e.target.value))}
                                            placeholder="Step 4"
                                        />
                                    </Stack>
                                    <Stack isInline>
                                        <Text fontWeight="bold">Step5:</Text>
                                        <Input
                                            size="sm"
                                            value={step5}
                                            onChange={(e) => setStep5(parseFloat(e.target.value))}
                                            placeholder="Step 5"
                                        />
                                    </Stack>
                                    <Stack isInline>
                                        <Text fontWeight="bold">Step6:</Text>
                                        <Input
                                            size="sm"
                                            value={step6}
                                            onChange={(e) => setStep6(parseFloat(e.target.value))}
                                            placeholder="Step 6"
                                        />
                                    </Stack>
                                    <Stack isInline>
                                        <Text fontWeight="bold">Step7:</Text>
                                        <Input
                                            size="sm"
                                            value={step7}
                                            onChange={(e) => setStep7(parseFloat(e.target.value))}
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
    )
}

export default RightTechniquesBox
