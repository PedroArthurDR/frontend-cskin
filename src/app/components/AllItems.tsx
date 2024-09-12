import { IonIcon } from '@ionic/react';
import { arrowDownOutline, cartOutline } from 'ionicons/icons';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Fade } from 'react-awesome-reveal';
import { Input, RadioGroup, Radio, Stack, Select, Tabs, TabList, TabPanels, Tab, TabPanel, useToast,   
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Modal,
  ModalCloseButton,
  Button,
  useDisclosure } from '@chakra-ui/react';
interface AllItemsProps {
    scrollToNext: () => void;
  }
  
  const AllItems: React.FC = () => {
    const [items, setItems] = useState<any[]>([]);
    const [initialItems, setInitialItems] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [value, setValue] = useState<string>('');
    const [localRadioValue, setLocalRadioValue] = useState<string>('all');
    const [apiRadioValue, setApiRadioValue] = useState<string>('all');
    const [sortValue, setSortValue] = useState<string>('price-asc');
    const [floatRange, setFloatRange] = useState<string>('0.0-1.0');
    const [priceRange, setPriceRange] = useState<string>('0-10000');
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedItem, setSelectedItem] = useState<any>(null); 


    useEffect(() => {
      axios
        .get('http://localhost:4000/items')
        .then((response) => {
          setItems(response.data);
          setInitialItems(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError('Erro ao carregar os itens');
          setLoading(false);
        });
    }, []);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value.toLowerCase());
    };
  
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSortValue(event.target.value);
    };
  

    const handleAPIFilterChange = () => {

        if (apiRadioValue === 'all' && floatRange === '0.0-1.0' && priceRange === '0-10000') {
          setItems(initialItems); 
          toast({
            title: 'Todos os itens exibidos.',
            description: 'Você voltou ao estado inicial sem filtros aplicados.',
            status: 'info',
            duration: 3000,
            isClosable: true,
          });
        } else {
   
          const apiUrl = `http://localhost:4000/items?float=${floatRange}&price=${priceRange}${
            apiRadioValue !== 'all' ? `&category=${apiRadioValue}` : ''
          }`;
          console.log(apiUrl)
      
          axios
            .get(apiUrl)
            .then((response) => {
              if (response.data.length === 0) {
                toast({
                  title: 'Nenhum item encontrado.',
                  description: 'Nenhum resultado para os filtros aplicados. Mostrando todos os itens.',
                  status: 'warning',
                  duration: 3000,
                  isClosable: true,
                });
                setItems(initialItems); 
              } else {
                setItems(response.data); 
              }
            })
            .catch((err) => {
              setError('Erro ao aplicar os filtros');
            });
        }
      };
      
      const handleItemClick = (item: any) => {
        setSelectedItem(item); 
        onOpen(); 
      };
    
      const calculateFloatPosition = (float: string) => {
        const floatValue = parseFloat(float);
        return (floatValue * 100); // Converte o float para uma porcentagem
      };
    const sortedItems = [...items]
      .filter((item) => {
        const matchName = item.name.toLowerCase().includes(value);
        const matchCategory = localRadioValue === 'all' || item.category === localRadioValue;
        return matchName && matchCategory;
      })
      .sort((a, b) => {
        if (sortValue === 'price-asc') {
          return a.price - b.price;
        } else if (sortValue === 'price-desc') {
          return b.price - a.price;
        } else if (sortValue === 'float-asc') {
          return parseFloat(a.float) - parseFloat(b.float);
        } else if (sortValue === 'float-desc') {
          return parseFloat(b.float) - parseFloat(a.float);
        }
        return 0;
      });
  
    if (loading) {
      return <p>Carregando...</p>;
    }
  
    if (error) {
      return <p>{error}</p>;
    }
  
    return (
      <FirstSection>
        <Tabs align='center' variant='soft-rounded' colorScheme='green'>
          <TabList>
            <Tab>Filtros Locais</Tab>
            <Tab>Filtros pela API</Tab>
          </TabList>
  
          <TabPanels>
            <TabPanel>
              <Stack color="white" spacing={5}>
                <Input
                  value={value}
                  onChange={handleChange}
                  variant="flushed"
                  placeholder="Pesquisar por nome"
                  size="lg"
                />
                <RadioGroup onChange={setLocalRadioValue} value={localRadioValue}>
                  <Stack spacing={5} direction="row">
                    <Radio value="all">Todos</Radio>
                    <Radio value="rifle">Rifle</Radio>
                    <Radio value="pistola">Pistola</Radio>
                    <Radio value="faca">Faca</Radio>
                    <Radio value="smg">SMG</Radio>
                  </Stack>
                </RadioGroup>
  
        
              </Stack>
            </TabPanel>
  
            <TabPanel>
              <Stack color="white" spacing={5}>
                <Select
                  placeholder="Filtrar por Float"
                  onChange={(e) => setFloatRange(e.target.value)}
                  value={floatRange}
                  bg="gray.700"
                  color="white"
                  _hover={{ bg: 'gray.600' }}
                >
                  <option style={{ color: 'black' }} value="0.0-1.0">0.0 - 1.0</option>
                  <option style={{ color: 'black' }} value="0.0-0.5">0.0 - 0.5</option>
                  <option style={{ color: 'black' }} value="0.5-1.0">0.5 - 1.0</option>
                </Select>
  
                <Select
                  placeholder="Filtrar por Preço"
                  onChange={(e) => setPriceRange(e.target.value)}
                  value={priceRange}
                  bg="gray.700"
                  color="white"
                  _hover={{ bg: 'gray.600' }}
                >
                  <option style={{ color: 'black' }} value="0-100">0 - 100</option>
                  <option style={{ color: 'black' }} value="100-500">100 - 500</option>
                  <option style={{ color: 'black' }} value="500-1000">500 - 1000</option>
                </Select>
  
                <RadioGroup onChange={setApiRadioValue} value={apiRadioValue}>
                  <Stack spacing={5} direction="row">
                    <Radio value="all">Todos</Radio>
                    <Radio value="rifle">Rifle</Radio>
                    <Radio value="pistola">Pistola</Radio>
                    <Radio value="faca">Faca</Radio>
                    <Radio value="smg">SMG</Radio>
                  </Stack>
                </RadioGroup>
  
                <ButtonFilter onClick={handleAPIFilterChange}>Aplicar Filtros</ButtonFilter>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
                <Select
                    w="260px"
                    placeholder="Ordenar por"
                    onChange={handleSortChange}
                    value={sortValue}
                    bg="gray.700"
                    color="white"
                    _hover={{ bg: 'gray.600' }}
                    >
                  <option style={{ color: 'black' }} value="price-asc">Preço - Menor para Maior</option>
                  <option style={{ color: 'black' }} value="price-desc">Preço - Maior para Menor</option>
                  <option style={{ color: 'black' }} value="float-asc">Float - Menor para Maior</option>
                  <option style={{ color: 'black' }} value="float-desc">Float - Maior para Menor</option>
                </Select>
                <ItemsContainer>
        <Fade triggerOnce cascade damping={0.1}>
          {sortedItems.map((item) => (
            <ItemCard onClick={() => handleItemClick(item)} key={item.id}>
              <div>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>Preço: ${item.price}</p>
                <p>Float: {item.float}</p>
              </div>
            </ItemCard>
          ))}
        </Fade>
      </ItemsContainer>

      <Modal size={'xl'}  isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter='blur(10px) hue-rotate(45deg)' />
        <ModalContent bg="gray.800" color="white">
          {selectedItem && (
            <>
              <ModalHeader>{selectedItem.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <img src={selectedItem.image} alt={selectedItem.name} style={{ width: '100%' }} />
                <h1>Preço: ${selectedItem.price}</h1>
                <h2>Float: {selectedItem.float}</h2>
                <GradientBar>
                  <Arrow style={{left: `${calculateFloatPosition(selectedItem.float)}%` }} />
                </GradientBar>
              </ModalBody>
              <ModalFooter>
              <Link href="https://www.cskinstore.com" passHref>
                <Button colorScheme="green" as="a" leftIcon={<IonIcon icon={cartOutline} style={{ fontSize: '2rem', color: 'white' }} />}>
                  Comprar
                </Button>
              </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </FirstSection>
    );
  };
  
  export default AllItems;

  const GradientBar = styled.div`
  width: 100%;
  height: 20px;
  background: linear-gradient(to right, green 0%, yellow 50%, red 100%);
  position: relative;
  border-radius: 10px;
  margin-top: 10px;
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid white;
  position: absolute;
  top: 15px;
  transform: translateX(-50%);
`;

  const ButtonFilter = styled.button`
      cursor: pointer;
    transition-duration: 0.3s;
    overflow: hidden;
  
    &:hover {
      border-radius: 50px;
      background-color: #ffa500;
      border: 2px solid #ffa500;
      box-shadow: 0px 0px 0px 0px #ffa500;
      color: black;
    }
  `

const FirstSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
    
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("/images/ak_background.png");
    background-size: cover;
    background-position: center;
    filter: blur(10px);
    z-index: -1;
    transform: scale(1.1);
  }
`;

const ItemsContainer = styled.div`
    width: 85%;
    display: flex;
    height:50%;
    overflow-y: scroll;
    justify-content: space-evenly;
    flex-wrap: wrap;
    @media (max-width: 768px) {
        overflow-x: scroll;
        align-items: center;
    }
`;

const ItemCard = styled.div`
 background-image: linear-gradient(163deg, #48ff00 0%, #004b0c 100%);
 border-radius: 20px;
 transition: all .3s;
  width: 230px;
  height: 284px;
  text-align: center;
  color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  margin:20px;
  transition: all ease 0.3s;
  cursor: pointer;
  div{
    background-color: #1a1a1a;
    transition: all .2s;
    width: 230px;
    height: 284px;
    padding:10px;
    &:hover{
        transform: scale(0.98);
        border-radius: 20px;
    }
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    transition: all .2s;
  }

  h3 {
    margin: 8px 0;
    font-size: 1em;
    font-weight: bold;
  }

  p {
    margin: 5px 0;
  }

  &:hover{
    box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.30);
    img{
        rotate: 15deg;
    }
  }
`;

