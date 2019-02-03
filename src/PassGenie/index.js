import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/lab/Slider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;    
    height: 100%;
    position: absolute;
    background: rgba(0,0,0,0.14);
    .card {
        margin-left: auto;
        width: 40%;
        margin-right: auto;
        margin-top: 150px;
    }
    h2 { 
       text-align: center;
       font-weight: 600; 
    }
`;

const TextFieldContainer = styled.div`
    width: 60%;
    margin: auto;
    .field {
        width: 100%;
        input {
            text-align: center;
        }
    }
`;

const ControllsContainer = styled.div`
    margin-top: 20px;
    height: 300px;
    .header .name {
        position: absolute;
    }
    .header .value {
        text-align: right;
    }
`;

const SliderContainer = styled.div`
    margin-top: 40px;
`;

const StrengthContainer = styled.div`
    height: 100px;
    margin-top: 70px;
`;

class PassGenie extends Component {
    state = {
        password: '',
        maxLength: 64,
        maxDigits: 10,
        maxSymbold: 10,
        length: 15,
        digits: 6,
        symbold: 2
    }

    componentDidMount() {
        this.generatePassword();
    }
    generateRandom = (string, length) => {
        return Array(length).fill(string).map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    }
    generatePassword = () => {
        // Gets symbols randomly with selected value
        let symbold = this.generateRandom('=+-_]}[{/?.>,<', this.state.symbold);
        // Gets digits randomly with selected value
        let digits = this.generateRandom('0123456789', this.state.digits);
        // Letter length will be the rest apart from symbols and digits
        let length = this.state.length - this.state.symbold - this.state.digits;
        // Get letters randomly upper and lower case
        let letters = this.generateRandom('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', length);
        let password = letters.concat(symbold, digits);
        // Splits the password selected string into array
        // Sorts the array items to random
        // Joins array items with join
        let shufflePassword = password.split('').sort(function () { return 0.5 - Math.random() }).join('');
        // Set state for the password
        this.setState({ password: shufflePassword })
    }
    handleChangeLength = (e, value) => {
        this.setState({ length: Math.round(value) });
        this.generatePassword();
    }
    handleChangeSymbold = (e, value) => {
        this.setState({ symbold: Math.round(value) });
        this.generatePassword();
    }
    handleChangeDigits = (e, value) => {
        this.setState({ digits: Math.round(value) });
        this.generatePassword();
    }
    render() {
        return (
            <Wrapper>
                <Card className='card'>
                    <CardContent>
                        <Typography component="h2">
                            The Password Genie
                        </Typography>
                        <TextFieldContainer>
                            <TextField
                                className='field'
                                id="outlined-read-only-input"
                                label="Password"
                                value={this.state.password}
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                            />
                            <Button onClick={this.generatePassword}>Generate</Button>
                        </TextFieldContainer>
                        <ControllsContainer>
                            <StrengthContainer>
                                <div className='header'>
                                    <Typography component='span' className='name'>
                                        Name
                                    </Typography >
                                    <Typography component='span' className='value'>
                                        Value
                                    </Typography>
                                </div>
                                <LinearProgress color="secondary" variant="buffer" value={20} valueBuffer={20} />
                            </StrengthContainer>
                            <Divider />
                            <SliderContainer>
                                <div className='header'>
                                    <Typography component='span' className='name'>
                                        Length
                                    </Typography >
                                    <Typography component='span' className='value'>
                                        {this.state.length}
                                    </Typography>
                                </div>
                                <Slider
                                    value={this.state.length}
                                    aria-labelledby="label"
                                    max={this.state.maxLength}
                                    onChange={this.handleChangeLength}
                                />
                            </SliderContainer>
                            <SliderContainer>
                                <div className='header'>
                                    <Typography component='span' className='name'>
                                        Symbold
                                    </Typography >
                                    <Typography component='span' className='value'>
                                        {this.state.symbold}
                                    </Typography>
                                </div>
                                <Slider
                                    value={this.state.symbold}
                                    aria-labelledby="label"
                                    max={this.state.maxSymbold}
                                    onChange={this.handleChangeSymbold}
                                />
                            </SliderContainer>
                            <SliderContainer>
                                <div className='header'>
                                    <Typography component='span' className='name'>
                                        Digits
                                    </Typography >
                                    <Typography component='span' className='value'>
                                        {this.state.digits}
                                    </Typography>
                                </div>
                                <Slider
                                    value={this.state.digits}
                                    aria-labelledby="label"
                                    max={this.state.maxDigits}
                                    onChange={this.handleChangeDigits}
                                />
                            </SliderContainer>
                        </ControllsContainer>
                    </CardContent>
                </Card>
            </Wrapper>
        );
    }
}

export default PassGenie;
