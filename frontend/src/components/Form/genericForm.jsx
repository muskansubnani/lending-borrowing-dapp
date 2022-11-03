import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Heading,
  Select
} from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  amount: 0,
  duration: 0,
};

export const GenericForm = ({ handleSubmit, maxAmount, formType }) => {
  const validationSchema = Yup.object({
    amount: Yup.number().required().min(0).max(maxAmount),
    duration: Yup.number().required().min(1).max(2),
  });

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: validationSchema,
  });

  return (
    <Flex bg="gray.100">
      <Box bg="white" p={10} rounded="md">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={6} align="flex-start">
            <Heading>New {formType}</Heading>
            <FormControl>
              <FormLabel htmlFor="amount">Amount</FormLabel>
              <Input
                id="amount"
                name="amount"
                type="number"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.amount}
              />
              {formik.touched.amount && formik.errors.amount && (
                <Text color="tomato">{formik.errors.amount}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="duration">Duration</FormLabel>
              <Select  id="duration"
                name="duration"
                type="number"
                variant="filled"
                placeholder ="select year(s)"
                size ="md"
                onChange={formik.handleChange}
                value={formik.values.duration}>
                <option value = "1">1</option>
                <option value = "2">2</option>
              </Select>
           
              {formik.touched.duration && formik.errors.duration && (
                <Text color="tomato">{formik.errors.duration}</Text>
              )}
            </FormControl>
            <Button type="submit" colorScheme="purple" width="full">
              Create
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};